import { useState, useEffect } from 'react';
import marked from 'marked'; // Add marked library for Markdown rendering

const apiData = [
  {
    "url": "/messages",
    "method": "GET",
    "description": "Retrieve a list of messages.  This endpoint allows you to fetch messages from the system.  Results are paginated.",
    "requestParameters": [
      {
        "name": "limit",
        "type": "integer",
        "required": false,
        "description": "Maximum number of messages to return. Defaults to 20.",
        "example": "10"
      },
      {
        "name": "offset",
        "type": "integer",
        "required": false,
        "description": "Offset for pagination.  Use with 'limit' to control pagination.",
        "example": "20"
      },
      {
        "name": "before",
        "type": "string",
        "required": false,
        "description": "Return messages before this timestamp (ISO 8601 format).",
        "example": "2024-07-27T10:00:00Z"
      },
      {
        "name": "after",
        "type": "string",
        "required": false,
        "description": "Return messages after this timestamp (ISO 8601 format).",
        "example": "2024-07-27T10:00:00Z"
      }
    ],
    "responseFormat": {
      "type": "json",
      "example": "[{\"id\": 1, \"text\": \"Hello, world!\", \"sender\": \"user1\", \"timestamp\": \"2024-07-26T10:00:00Z\"}, {\"id\": 2, \"text\": \"How are you?\", \"sender\": \"user2\", \"timestamp\": \"2024-07-26T10:01:00Z\"}]",
      "fields": [
        {"name": "id", "type": "integer", "description": "Unique message ID"},
        {"name": "text", "type": "string", "description": "Message text"},
        {"name": "sender", "type": "string", "description": "Sender ID"},
        {"name": "timestamp", "type": "string", "description": "Message timestamp (ISO 8601)"}
      ]
    },
    "authentication": "API Key (in header `x-api-key`) ",
    "errorHandling": {
      "400": "Bad Request: Invalid request parameters.",
      "401": "Unauthorized: Invalid or missing API key.",
      "404": "Not Found: No messages found.",
      "500": "Internal Server Error"
    },
    "rateLimit": {
      "requestsPerMinute": 100
    }
  },
  // ... (rest of the API endpoints with similar improvements)
  {
    "url": "/messages",
    "method": "POST",
    "description": "Send a new message.",
    "requestParameters": [
      {
        "name": "text",
        "type": "string",
        "required": true,
        "description": "The text of the message.",
        "example": "This is a new message."
      },
      {
        "name": "sender",
        "type": "string",
        "required": true,
        "description": "The sender of the message.",
        "example": "user1"
      }
    ],
    "responseFormat": {
      "type": "json",
      "example": "{\"id\": 3, \"text\": \"This is a new message.\", \"sender\": \"user1\", \"timestamp\": \"2024-07-26T10:02:00Z\"}",
      "fields": [
        {"name": "id", "type": "integer", "description": "Unique message ID"},
        {"name": "text", "type": "string", "description": "Message text"},
        {"name": "sender", "type": "string", "description": "Sender ID"},
        {"name": "timestamp", "type": "string", "description": "Message timestamp (ISO 8601)"}
      ]
    },
    "authentication": "API Key (in header `x-api-key`)",
    "errorHandling": {
      "400": "Bad Request: Missing or invalid parameters.",
      "401": "Unauthorized: Invalid or missing API key.",
      "500": "Internal Server Error"
    },
    "rateLimit": {
      "requestsPerMinute": 50
    }
  },
    {
    "url": "/users/{userId}",
    "method": "GET",
    "description": "Retrieve user information.",
    "requestParameters": [
      {
        "name": "userId",
        "type": "integer",
        "required": true,
        "description": "The ID of the user.",
        "example": "1"
      }
    ],
    "responseFormat": {
      "type": "json",
      "example": "{\"id\": 1, \"username\": \"john.doe\", \"email\": \"john.doe@example.com\"}",
      "fields": [
        {"name": "id", "type": "integer", "description": "Unique user ID"},
        {"name": "username", "type": "string", "description": "User's username"},
        {"name": "email", "type": "string", "description": "User's email address"}
      ]
    },
    "authentication": "API Key (in header `x-api-key`)",
    "errorHandling": {
      "400": "Bad Request: Invalid userId.",
      "401": "Unauthorized: Invalid or missing API key.",
      "404": "User not found",
      "500": "Internal Server Error"
    },
    "rateLimit": {
      "requestsPerMinute": 20
    }
  }
];

const generateMarkdown = (apiData: any[]) => {
  let markdown = `# API Documentation\n\n`;
  apiData.forEach(endpoint => {
    markdown += `## ${endpoint.method} ${endpoint.url}\n\n`;
    markdown += `**Description:** ${endpoint.description}\n\n`;
    if (endpoint.requestParameters.length > 0) {
      markdown += `**Request Parameters:**\n\n`;
      endpoint.requestParameters.forEach(param => {
        markdown += `- \`${param.name}\` (${param.type}): ${param.description} ${param.required ? '**Required**' : ''}  Example: \`${param.example || ''}\`\n`;
      });
      markdown += `\n`;
    }
    markdown += `**Response Format:** ${endpoint.responseFormat.type}\n\n`;
    if (endpoint.responseFormat.fields) {
      markdown += "**Response Fields:**\n\n";
      endpoint.responseFormat.fields.forEach(field => {
        markdown += `- \`${field.name}\` (${field.type}): ${field.description}\n`;
      });
      markdown += "\n";
    }
    markdown += `**Response Example:**\n\`\`\`json\n${endpoint.responseFormat.example}\n\`\`\`\n\n`;
    markdown += `**Authentication:** ${endpoint.authentication}\n\n`;
    markdown += `**Error Handling:**\n`;
    for (const code in endpoint.errorHandling) {
      markdown += `- ${code}: ${endpoint.errorHandling[code]}\n`;
    }
    markdown += `\n`;
    markdown += `**Rate Limit:** ${endpoint.rateLimit.requestsPerMinute} requests per minute\n\n`;
  });
  return markdown;
};

const DocAPIPage = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    setMarkdown(generateMarkdown(apiData));
  }, []);

  return (
    <div>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default DocAPIPage;
