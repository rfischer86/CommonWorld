
using System;
using System.Collections.Generic;

using System.Reflection;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;


namespace Helper
{
    public class Helper
    {
        public static string RandomId() { Random rnd = new Random();
            string randId = Math.Round(rnd.NextDouble() * Math.Pow(10 , 16), 0).ToString();
            return randId;
        }

        public static void print(string line)
        {
            Console.Write(line);
            Console.Write("\n");
        }
        public static void printList(string[] line)
        {
            // Helper.Helper.printList(new string[] {"id", id, errorItem.id});
            foreach (var item in line)
            {
                Console.Write(item + " ");
            }
            Console.Write("\n");
        }

        public static void printObject <T> ( T obj ) {
            var options = new JsonSerializerOptions{WriteIndented = true};
            string jsonString = JsonSerializer.Serialize<T>(obj, options);
            Console.WriteLine(jsonString);
        }



    }
}