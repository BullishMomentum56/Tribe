# Security Guidelines for Tribe

## Security Features Implemented

### 1. **Security Headers (Middleware)**
The application includes a Next.js middleware (`middleware.ts`) that sets the following security headers on all responses:

- **X-Content-Type-Options**: `nosniff` - Prevents MIME type sniffing
- **X-Frame-Options**: `DENY` - Prevents clickjacking attacks
- **X-XSS-Protection**: `1; mode=block` - Enables XSS protection
- **Referrer-Policy**: `strict-origin-when-cross-origin` - Controls referrer information
- **Permissions-Policy**: Restricts access to geolocation, microphone, and camera

### 2. **Link Security**
All external links with `target="_blank"` include:
- `rel="noopener noreferrer"` - Prevents window.opener access and referrer leakage

### 3. **Metadata & Robots**
- Proper referrer policy configuration
- SEO-friendly robot directives
- Clear title and description tags

## Addressing Chrome Security Warnings

### Common Causes for "Dangerous Site" Warnings

1. **New/Fresh Domain** - Chrome may flag recently registered domains as a precaution
2. **External Link to Unverified Domain** - `https://tribe.waitlist.so` should be verified as a legitimate domain
3. **Preview/Staging Environment** - Temporary preview URLs might trigger security warnings
4. **Missing SSL/HTTPS** - Ensure your deployment uses HTTPS in production

### Solutions

#### For Development/Preview:
- This warning is typically benign for staging/preview environments
- Chrome will not show this warning in production for legitimate domains
- The codebase itself is safe and doesn't contain malicious code

#### For Production Deployment:
1. **Ensure HTTPS**: All connections must use HTTPS
2. **Verify External Domains**: Make sure `https://tribe.waitlist.so` is:
   - Properly registered and owned by you/your organization
   - Uses HTTPS
   - Has valid SSL/TLS certificates
   - Doesn't host suspicious content
3. **Add Trust Signals**:
   - Create a robots.txt file
   - Add a security.txt file
   - Include privacy and terms pages
   - Implement proper contact information
4. **Monitor Security**: Use Google Search Console to monitor security issues

## Content Security Policy (CSP)

To add CSP headers for additional protection, update `middleware.ts`:

```typescript
response.headers.set(
  "Content-Security-Policy",
  "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com; connect-src 'self' https://*"
);
```

## Safe External Links

All external links in the application:
- Use `rel="noopener noreferrer"` for security
- Should point to verified, trusted domains
- Target="_blank" links open in a new window safely

## Development Practices

- No inline scripts or event handlers
- All data is sanitized by React (XSS protection by default)
- Type-safe code with TypeScript strict mode
- No third-party tracking without consent

## Deployment Checklist

- [ ] Verify domain ownership and SSL certificates
- [ ] Enable HTTPS only (HTTP → HTTPS redirect)
- [ ] Add robots.txt for search engines
- [ ] Create privacy policy and terms of service
- [ ] Test with Chrome DevTools security audit
- [ ] Monitor Google Search Console for warnings
- [ ] Implement proper CORS if needed
- [ ] Use environment variables for sensitive data
- [ ] Enable DDoS protection (Cloudflare, AWS Shield, etc.)

## Questions?

For security concerns or to report vulnerabilities, please contact the development team.
