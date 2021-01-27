


using System.Collections.Generic;
using System.Net.Http;
using System.Net;

namespace Helper
{
    public static class HttpError
    {
        public static string idNotExist = "The id do not exist in requested Resourse.";
        public static string idAllreadyExist = "The id do not exist in requested Resourse.";
        public static string noUniqueParameter = "The send Object has no unique parameter.";

        public static string entityExist ="Cannot create the term because it already exists.";
        public static string getIdNotExist(string table, string id )
        {
            return "The id " + id + " do not exist in the table " + table;   
        }

        public static string getIdAlreadyExist(string table, string id )
        {
            return "The id " + id + " do allready exist in the table " + table;   
        }

        public static string getFieldIsRequiered(string table, string field)
        {
            return "The field '" + field + "'is requiered in the table '" + table +"'.";   
        }

        public static string getNoUniqueParameter(string entity, string[] parameter)
        {
            string message = "The send Entity " + entity + " has no unique parameter.";
            if (parameter.Length > 0) {
                message += " The unique parameter are: ";
                foreach (var item in parameter)
                {
                    message += item + " ";
                }
            } 
            return message;
        }

        public static string getNoEntryForParameter(string table, string[] parameter)
        {
            string message = "The table '" + table + " has no entry for the values: ";
            if (parameter.Length > 0) {
                foreach (var item in parameter)
                {
                    message += item + " ";
                }
            } 
            return message;
        }
        public static string getProvideNoEntity(string table)
        {
            return "The Entity to create at table '" + table + " was null";
        }

        public static string getEntityExistForParameter(string table, string[] parameter)
        {
            string message = "The table '" + table + " has a entry for the values: ";
            if (parameter.Length > 0) {
                foreach (var item in parameter)
                {
                    message += item + " ";
                }
            } 
            return message;
        }
        public static string getParameterAllreadyExist(string table, string field, string value )
        {
            string message = "The value '" + value;
            message += "' for the unique field '" + field;
            message += "' allready exist in the table '" + table + "'.";
            return message;
        }

        public static string getIdAllreadyExist(string table, string id )
        {
            string message = "The Id '" + id;
            message += "' allready exist in the table '" + table + "'.";
            return message;
        }
        public static string getNoTableEntryForValue(string table, string field, string value )
        {
            string message = "There is no entry of the value'" + value;
            message += "' of the field '" + field;
            message +="' in the table '" + table + "'.";
            return message;
        }
        public static string getFieldsNotProvidedForTable(string table, string field )
        {
            string message = "The Field '" + field;
            message +="' of the table '" + table + "' is empty.";
            return message;
        }
        public static string getTryNullValueAccess(string table, string field )
        {
            string message = "Provide a null to find Entity, for the Field '" + field;
            message +="' of the table '" + table + "'.";
            return message;
        }

        public static string getDeleteIdFromTable(string table, string id )
        {
            string message = "Delete the id '" + id +"' from table '" + table + "'.";
            return message;
        }


        public static string getDeleteReduceReferencCount(string table, string id )
        {
            string message = "Reduce the count of refereences of the entity of id '" + id +"' from table '" + table + "'.";
            return message;
        }
        public static string getAddIdIntoTable(string table, string id )
        {
            string message = "Add the entity with id '" + id +"' into the table '" + table + "'.";
            return message;
        }

        public static string getUpdateDataOfId(string table, string id )
        {
            string message = "Update the entity with id '" + id +"' into the table '" + table + "'.";
            return message;
        }
        public static string getNoElementFound(string table )
        {
            string message = "Emoty is the search of the table '" + table + "'.";
            return message;
        }

    }
    public class ErrorMsg
    {
        public List<string> messageList {get; set; } = new List<string>();
        public bool hasError {get; set; } = false;
        public HttpStatusCode statusCode {get; set; } = new HttpStatusCode();
        public void addMessage(string info, bool withMsg = true)
        {
            if (withMsg) {
                messageList.Add(info);
            }
            hasError = true;
            return;
        } 
        public void addInfo(string info)
        {
            messageList.Add(info);
            return;
        } 

        public void setStatusCode(HttpStatusCode code)
        {
            statusCode = code; 
        } 
        public string getMessage()
        {
            return messageList.ToString(); 
        } 
        public ErrorMsg create() {
            ErrorMsg selfError = new ErrorMsg();
            selfError.statusCode = statusCode;
            selfError.hasError = hasError;
            selfError.messageList = messageList;
            return selfError;
        }

        public HttpResponseMessage GetActionResult()
        {
            var result = new HttpResponseMessage(statusCode);
            return result;
        }

    }
}