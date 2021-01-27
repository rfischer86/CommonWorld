using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BuildLogger_DB_Context
{    
    public enum FormTypes {
        textField = 1,
        image = 2,
        textarea = 3,
        date = 4,
        number = 5,
        checkbox = 6,
        select = 7,
        range = 8,
        file = 9,
        time = 10,
    }
    public class Form
    {
        [Key]
        public string apiId { get; set; }
        public string name { get; set; }
        public bool activ  { get; set; }
        public bool local  { get; set; }
        public bool isValid  { get; set; }
        
        public string parentFormularId { get; set; }
        public string version { get; set; }
        public virtual List<FormElement> formElements { get; set; }
        public virtual List<Form> subFormulars { get; set; }
    }   


    public class FormElement
    {
        [Key]
        public string apiId { get; set; }
        public string label { get; set; }       
        public string value  { get; set; }
        public string description  { get; set; }
        public string widthClass  { get; set; }
        public string metaData  { get; set; }
        public string defaultValue  { get; set; }
        public string unit  { get; set; }
        public string version  { get; set; }
        public bool required  { get; set; }
        public bool valid  { get; set; }
        public FormTypes formType  { get; set; }

    }

    public class FormForm
    {

        [Key]
        public string apiId { get; set; }
        public string child_API_Id { get; set; }
        public string parent_API_Id { get; set; }

        public virtual Form child { get; set; }
        public virtual Form parent { get; set; }
    }


    public class FormFormElement
    {

        [Key]
        public string apiId { get; set; }
        public string parent_API_Id { get; set; }
        public string child_API_Id { get; set; }
        public virtual Form parent { get; set; }
        public virtual FormElement child { get; set; }
    }
}