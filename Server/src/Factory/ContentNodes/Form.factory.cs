using System.Linq;
using Helper;
using BuildLogger_DB_Context;
using System.Collections.Generic;
using FormElement_Factory; 
using WebApi.Models;

namespace Form_Factory
{   

    public class FormFactory
    {
        private BuildLoggerContext db = new BuildLoggerContext();
        private FormElementFactory formElementFactory = new FormElementFactory();      
        public ServerResult<Form> getByUniqueParams(Form entity, bool withMsg = false)
        {   
            ServerResult<Form> sr = ServerResult<Form>.create();
            if (entity.apiId != null) 
            {
                return getById(entity.apiId, withMsg);
            }
            string[] parameter = {"id"};
            sr.error.addMessage(Helper.HttpError.getNoUniqueParameter("Form", parameter ));
            sr.fail();
            return sr;
        }
        public ServerResult<Form> create(Form entity, bool withMsg = true) 
        {
            ServerResult<Form> sr = passCreateGurd(entity);
            if ( !sr.success ) {
                return sr;
            }
            sr = getByUniqueParams(entity, withMsg);
            if (sr.success) 
            {
                sr.error.addMessage(HttpError.entityExist, withMsg);
                sr.fail();
            } else {
                sr.succeed();
                sr.result = new Form();
                sr.result.apiId = entity.apiId;
                sr.result.name = entity.name;
                sr.result.version = entity.version;
                sr.result.parentFormularId = entity.parentFormularId;
                sr.result.subFormulars = new List<Form>();
                sr.result.formElements = new List<FormElement>();
                sr.result.activ = sr.result.apiId == null;
                sr.result.local = entity.local;
                if (sr.result.apiId == null ) {
                    sr.result.apiId = Helper.Helper.RandomId();
                }
                Helper.Helper.print("sr");
                Helper.Helper.printObject(sr);
                sr.error.addInfo(HttpError.getAddIdIntoTable(TabelList.Form, sr.result.apiId));
                db.Add(sr.result);
                db.SaveChanges();
            }
            return sr;
        }


        public ServerResult<Form> update(Form entity, bool withMsg = true) 
        {           
            using(BuildLoggerContext db = new BuildLoggerContext()){
                ServerResult<Form> sr = passCreateGurd(entity);
                if ( !sr.success ) {
                    return sr;
                }
                sr = sr.contatenate( sr, getOrCreate(entity));
                if (sr.result == null ) {
                    sr.error.addMessage(HttpError.getNoTableEntryForValue(TabelList.Form, "id", entity.apiId), withMsg);
                    sr.fail();
                    return sr;
                }
                sr.result.name = entity.name;
                sr.result.version = entity.version;
                sr.result.parentFormularId = entity.parentFormularId;
                Helper.Helper.print("Nav Element");
                // db.Update(sr.result);
                sr.error.addInfo(HttpError.getAddIdIntoTable(TabelList.Form, sr.result.apiId));
                db.SaveChanges();
                sr = updateFormularElements(sr, entity);
                sr = updateSubFormular(sr, entity);
                return sr;
            }
        }
        public ServerResult<Form> updateSubFormular(ServerResult<Form> sr, Form entity, bool withMsg = true) {
            if (entity.subFormulars == null) {
                sr.error.addMessage("The Formular has no sub Formulars");
                return sr;}
            using(BuildLoggerContext db = new BuildLoggerContext()) {
                List<Form> existingSubFormulars =  db.FormForm
                    .Where(el => el.parent_API_Id == entity.apiId)
                    .Select(el => el.child)
                    .ToList();
                foreach (Form form in existingSubFormulars) {
                    if (!entity.subFormulars.Contains(form)) {
                        sr.error.addMessage("remove Form " + form.apiId);
                        db.Remove(form);
                    }
                }
                foreach (Form form in entity.subFormulars) {
                    if (!existingSubFormulars.Contains(form)) {
                        sr.error.addMessage("add Form " + form.apiId);
                        FormForm newFormForm = new FormForm();
                        newFormForm.parent_API_Id = entity.apiId;
                        newFormForm.child_API_Id = form.apiId;
                        newFormForm.parent = entity;
                        newFormForm.child = form;
                        db.Add(newFormForm);
                    }
                }
                db.SaveChanges();
            return sr;
            }
        }

        public ServerResult<Form> updateFormularElements (ServerResult<Form> sr , Form entity, bool withMsg = true) {
            if (entity.formElements == null) {
                sr.error.addMessage("The Formular has no FormularElements");
                return sr;
            }
            using(BuildLoggerContext db = new BuildLoggerContext()) {
                List<FormFormElement> existingFormularElement =  db.FormFormElement
                    .Where(el => el.parent_API_Id == entity.apiId)
                    .ToList();
                foreach (FormFormElement formElementLink in existingFormularElement) {
                    if( formElementLink != null) {
                        FormElement formElement = null;
                        bool souldFormElementDelete = true;
                        foreach (FormElement formElementTest in entity.formElements) {
                            if (formElementTest != null && formElementTest.apiId == formElementLink.child_API_Id) {
                                formElement = formElementTest;
                                souldFormElementDelete = false;
                            }
                        }
                        if (souldFormElementDelete) {
                            formElement =  db.FormElement
                            .Find(formElementLink.child_API_Id);
                            sr.error.addMessage("remove Form " + formElement);
                            // db.Remove(formElement);
                            db.Remove(formElementLink);
                        }
                    }
                }
                foreach (FormElement formElement  in entity.formElements) {
                    bool existFormElement = false;
                    foreach ( FormFormElement formElementTest in existingFormularElement) {
                        if (formElement != null && formElementTest != null) {
                            if (formElementTest.child_API_Id == formElement.apiId){
                                existFormElement = true;
                            }
                        }
                    }
                   if (formElement != null) {
                        if (existFormElement) {
                            Helper.Helper.printObject("formElement");
                            Helper.Helper.printObject(formElement);
                            ServerResult<FormElement> sr_sub = formElementFactory.update(formElement);
                        } else {
                            ServerResult<FormElement> sr_sub = formElementFactory.update(formElement);
                            sr.error.conncatenate(sr_sub.error.messageList);
                            sr.error.addMessage("add Form " + formElement.apiId);
                            formElementFactory.getOrCreate(formElement);
                            FormFormElement newFormFormElement = new FormFormElement();
                            newFormFormElement.parent_API_Id = entity.apiId;
                            newFormFormElement.child_API_Id = formElement.apiId;
                            newFormFormElement.apiId = Helper.Helper.RandomId();
                            db.Add(newFormFormElement);
                        }

                    }
                }
                db.SaveChanges();
            return sr;
            }
        }

        public ServerResult<Form> removeFormItem (string parentId, string childId,  bool withMsg = true) {
            ServerResult<Form> sr = ServerResult<Form>.create();
            Form parent_entity = db.Form.Find(parentId); 
            Form child_entity = db.Form.Find(childId);
            if (parent_entity == null) {
                sr.fail();
                sr.result = parent_entity;
                sr.error.addMessage(HttpError.idNotExist);
            } 
            if (child_entity == null) {
                sr.fail();
                sr.error.addMessage(HttpError.idNotExist);
            } 
            if (!sr.success) {
                return sr;
            }
            
            sr.result = parent_entity;
            db.SaveChanges();
            return sr;
        } 

        public ServerResult<Form> getOrCreate(Form entity, bool withMsg = false )
        {
            using(BuildLoggerContext db = new BuildLoggerContext()){
                ServerResult<Form> sr = getByUniqueParams(entity, withMsg);
                if (!sr.success ) 
                {
                    sr.succeed();
                    sr = create(entity);
                }
                return sr; 
            }
        }
        public ServerResult<Form> getById(string id, bool withMsg = true, int deeps = 5)
        {
            ServerResult<Form> sr = ServerResult<Form>.create();
            sr.result = db.Form.Find(id);
            if (sr.result == null ) {
                sr.error.addMessage(HttpError.getNoTableEntryForValue(TabelList.Form, "id", id), withMsg);
                sr.fail();
                return sr;
            };
            List<string> formElementIds =  db.FormFormElement
                .Where(el => el.parent_API_Id == sr.result.apiId)
                .Select(el => el.child_API_Id)
                .ToList();
            sr.result.formElements = new List<FormElement>();
            if (formElementIds != null) {
                foreach(string formElementId in formElementIds ) {
                    FormElement formElement = db.FormElement.Find(formElementId);
                    sr.result.formElements.Add(formElement);
                }
            }
            return sr;
        }

        public ServerResult<Form> deleteById(string id, bool withMsg = true)
        {
            ServerResult<Form> sr  = getById(id, withMsg);
            if (sr.success)
            {   
                    sr.result = db.Form.Find(id);
                    Helper.Helper.print("TO DO: implemnt delete cascade");
                    db.Remove(sr.result);
                    db.SaveChanges();
                    sr.error.addInfo(HttpError.getDeleteIdFromTable(TabelList.Form, id));
            } else {
                sr.error.addInfo(HttpError.getDeleteReduceReferencCount(TabelList.Form, id));
            }
            return sr;
        }
        public  ServerResult<Form> passCreateGurd(Form entity, bool withMsg = true) {
            ServerResult<Form> sr = ServerResult<Form>.create();
            sr.result = entity; 
            string[] parameter = {};
            if (sr.result == null) 
            {
                sr.error.addMessage(HttpError.getProvideNoEntity(TabelList.Form), withMsg);
                sr.fail();
            }
            if (!sr.success) {
                sr.error.addMessage(HttpError.getNoEntryForParameter(TabelList.Form, parameter), withMsg);
            }
            return sr;
        }


        public ServerResult<List<Form>> search(SearchModel search, bool withMsg = true)
        {
            ServerResult<List<Form>> sr = ServerResult<List<Form>>.create();
            List<Form> formElements = db.Form
                .Where(el => el.name.Contains(search.searchString) )
                .ToList();
            sr.result = formElements;
            // if (formElementIds != null) {
            //     foreach(string formElementId in formElementIds ) {
            //         FormElement formElement = db.FormElement.Find(formElementId);
            //         sr.result.formElements.Add(formElement);
            //     }
            // }
            return sr;
        }
    }
}
