using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BuildLogger_DB_Context
{    

    public static class ContentTypes
    {
        public const string text = "text";
        public const string form = "form";
        public const string table = "table";
        public const string pdf = "pdf";
        public const string code = "code";
        public const string math = "math";
        public const string picture = "picture";
        public const string date = "date";
        public const string feed = "feed";
        public const string canban = "canban";
        public const string map = "map";
    }

    public static class ContentState
    {
        public const string open = "open";
        public const string closed = "closed";
        public const string finished = "finished";
        public const string permanend = "permanend";
    }
}