# Canvas LMS Integration for Medical School Practice Test

## Overview
This document outlines the steps and considerations for integrating our Medical School Practice Test application with Canvas LMS, focusing on LTI (Learning Tools Interoperability) implementation and authentication processes.

## LTI Implementation Details

### 1. LTI Version
- We will aim to implement LTI 1.3, the latest version, which offers improved security and flexibility.
- LTI 1.3 uses OAuth 2.0 and JSON Web Tokens (JWTs) for secure communication.

### 2. LTI Launch Process
1. **Tool Registration**: Register our tool with Canvas, providing details like redirect URIs, public key, and supported LTI services.
2. **Launch Initiation**: Canvas initiates the launch by sending a signed JWT as a form post to our tool.
3. **JWT Validation**: Our tool validates the JWT signature and claims.
4. **OIDC Flow**: Perform OpenID Connect login flow to authenticate the user.
5. **Token Exchange**: Exchange the initial token for an access token to make API calls.

### 3. Key Components of LTI 1.3
- **Client ID**: Unique identifier for our tool in Canvas.
- **Deployment ID**: Identifies a specific deployment of our tool in a Canvas instance.
- **JWKS URL**: URL where our tool publishes its JSON Web Key Set for signature verification.
- **Auth Token URL**: Endpoint for token exchange.
- **Auth Login URL**: Endpoint for initiating OIDC login flow.

### 4. Required Endpoints in Our Application
- **Launch URL**: Receives the initial LTI launch request.
- **Redirect URI**: Handles the OIDC login response.
- **JWKS Endpoint**: Serves our public keys for JWT signature verification.

## Authentication and Authorization

### 1. Initial Authentication
- Use the OIDC flow initiated during the LTI launch to authenticate the user.
- Receive user information (like Canvas user ID, roles) in the ID token.

### 2. API Access Token
- Exchange the initial token for an API access token.
- Use this token for subsequent API calls to Canvas.

### 3. Token Management
- Implement secure storage for access tokens.
- Handle token refresh when tokens expire.

### 4. Scopes and Permissions
- Request appropriate scopes during the auth process (e.g., `url:GET|/api/v1/courses/:id/assignments`).
- Ensure our application only requests necessary permissions.

## Canvas API Integration

### 1. API Endpoints
- **Assignments API**: To create or update assignments in Canvas.
- **Submissions API**: To post student scores back to Canvas.

### 2. API Calls
- Use the access token in the Authorization header for all API requests.
- Format: `Authorization: Bearer <access_token>`

### 3. Error Handling
- Implement robust error handling for all API interactions.
- Handle common HTTP status codes (400, 401, 403, 404, 500).

## Security Considerations

### 1. HTTPS
- Ensure all communications use HTTPS.

### 2. JWT Validation
- Validate all aspects of incoming JWTs (signature, expiration, issuer, audience).

### 3. Secure Storage
- Securely store sensitive information (tokens, keys) using environment variables or secure key management systems.

### 4. Data Minimization
- Only request and store necessary user data to comply with privacy regulations.

## Implementation Phases

1. **Basic Setup**: Set up development environment and register tool with Canvas.
2. **Launch Handling**: Implement LTI launch endpoint and JWT validation.
3. **Authentication Flow**: Implement OIDC flow and token exchange.
4. **API Integration**: Develop Canvas API interactions for score submission.
5. **Testing & Refinement**: Thoroughly test in Canvas test environment.
6. **Documentation**: Create comprehensive documentation for deployment and usage.

## Next Steps

1. Set up a Canvas Developer account and create a test course.
2. Register our application as an LTI 1.3 tool in the Canvas Developer Portal.
3. Implement the LTI launch endpoint in our application.
4. Develop the OIDC flow and token exchange process.
5. Implement secure token storage and management.
6. Create API wrapper functions for interacting with Canvas APIs.
7. Implement error handling and logging for all LTI and API interactions.
8. Test the integration thoroughly in a sandbox environment.

## Resources

- [LTI 1.3 Implementation Guide](https://www.imsglobal.org/spec/lti/v1p3/impl/)
- [Canvas LTI Documentation](https://canvas.instructure.com/doc/api/file.lti_dev_key_config.html)
- [Canvas REST API Documentation](https://canvas.instructure.com/doc/api/)
- [OAuth 2.0 Specification](https://oauth.net/2/)
- [OpenID Connect](https://openid.net/connect/)

# Updated Canvas Integration Plan

## Current Situation
- We have access to generate an API token in the Canvas Developer Portal.
- We don't have access to create LTI Developer Keys in the sandbox environment.

## Revised Integration Approach

### 1. API Token Usage
- Use the generated API token for Canvas API interactions.
- This token will allow us to submit scores and interact with Canvas data.

### 2. Simulated LTI Launch
- For development purposes, we'll simulate the LTI launch process in our application.
- This will involve creating a mock LTI launch request with sample data.

### 3. Score Submission Implementation
- Implement the score submission process using the Canvas API and our API token.
- Use the Assignment and Submission API endpoints to post scores.

### 4. Error Handling and Logging
- Implement robust error handling for API interactions.
- Set up logging for troubleshooting and auditing.

## Next Steps

1. Securely store the API token in our application's environment variables.
2. Implement a simulated LTI launch process in our application.
3. Develop the score submission feature using the Canvas API and our token.
4. Create a test environment that mimics the flow of an LTI tool without actual LTI authentication.
5. Implement error handling and logging for all Canvas API interactions.
6. Test the score submission thoroughly in the sandbox environment.
7. Document the current limitations and the steps needed for a full LTI integration in the future.

## Future Considerations
- When full LTI integration becomes possible, we'll need to implement proper LTI launch handling and authentication.
- The current approach allows us to develop and test core functionalities, but a complete LTI integration will require additional steps and possibly institutional support.

## Resources
- [Canvas REST API Documentation](https://canvas.instructure.com/doc/api/)
- [Canvas API Authentication](https://canvas.instructure.com/doc/api/file.oauth.html)