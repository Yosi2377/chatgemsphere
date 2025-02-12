import { useState, useEffect } from 'react';

const apiData = [
  {
    "url": "/messages",
    "method": "GET",
    "description": "Retrieve a list of messages.",
    "requestParameters": [
      {
        "name": "limit",
        "type": "integer",
        "required": false,
        "description": "Maximum number of messages to return."
      },
      {
        "name": "offset",
        "type": "integer",
        "required": false,
        "description": "Offset for pagination."
      }
    ],
    "responseFormat": {
      "type": "json",
      "example": "[{\"id\": 1, \"text\": \"Hello, world!\", \"sender\": \"user1\", \"timestamp\": \"2024-07-26T10:00:00Z\"}, {\"id\": 2, \"text\": \"How are you?\", \"sender\": \"user2\", \"timestamp\": \"2024-07-26T10:01:00Z\"}]"
    },
    "authentication": "API Key",
    "errorHandling": {
      "400": "Bad Request",
      "401": "Unauthorized",
      "500": "Internal Server Error"
    },
    "rateLimit": {
      "requestsPerMinute": 100
    }
  },
  {
    "url": "/messages",
    "method": "POST",
    "description": "Send a new message.",
    "requestParameters": [
      {
        "name": "text",
        "type": "string",
        "required": true,
        "description": "The text of the message."
      },
      {
        "name": "sender",
        "type": "string",
        "required": true,
        "description": "The sender of the message."
      }
    ],
    "responseFormat": {
      "type": "json",
      "example": "{\"id\": 3, \"text\": \"This is a new message.\", \"sender\": \"user1\", \"timestamp\": \"2024-07-26T10:02:00Z\"}"
    },
    "authentication": "API Key",
    "errorHandling": {
      "400": "Bad Request",
      "401": "Unauthorized",
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
        "description": "The ID of the user."
      }
    ],
    "responseFormat": {
      "type": "json",
      "example": "{\"id\": 1, \"username\": \"john.doe\", \"email\": \"john.doe@example.com\"}"
    },
    "authentication": "API Key",
    "errorHandling": {
      "400": "Bad Request",
      "401": "Unauthorized",
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
        markdown += `- \`${param.name}\` (${param.type}): ${param.description} ${param.required ? '**Required**' : ''}\n`;
      });
      markdown += `\n`;
    }
    markdown += `**Response Format:** ${endpoint.responseFormat.type}\n\n`;
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
      <pre>{markdown}</pre>
    </div>
  );
};

export default DocAPIPage;
