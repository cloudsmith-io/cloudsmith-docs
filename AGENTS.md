# Technical Writing Style Guide for Agents

This guide provides editorial guidelines for writing clear and consistent technical documentation for Cloudsmith, optimized for consumption by agents and large language models (LLMs). It builds upon the [Google Developer Documentation Style Guide](https://developers.google.com/style) and incorporates Cloudsmith-specific conventions.

## Reference hierarchy

When writing or reviewing documentation, follow this precedence order:

1. **Cloudsmith-Specific Guidelines**: Follow Cloudsmith-specific guidelines outlined in this document.
2. **Google Developer Documentation Style Guide**: Refer to [developers.google.com/style](https://developers.google.com/style) for general technical writing standards.
3. **Third-Party References**: If the above do not provide explicit guidance, consult:
   - **Spelling**: [Merriam-Webster](https://www.merriam-webster.com/) (American English)
   - **Nontechnical Style**: *The Chicago Manual of Style*
   - **Technical Style**: [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/)

## Core principles

These principles are derived from the Google Developer Documentation Style Guide and form the foundation of Cloudsmith documentation:

1. **Task-Oriented**: Focus on what users need to accomplish, not product features.
2. **Clarity and Conciseness**: Use clear, succinct language. Avoid unnecessary words and repetition.
3. **Active Voice**: Use active voice to make instructions clear and direct.
4. **Scannability**: Structure content for quick scanning with headings, bullet points, and clear formatting.
5. **Contextual**: Write for the specific context where information appears.
6. **Consistent Terminology**: Use consistent terms, capitalization, and punctuation throughout.

## UX writing guidelines

These guidelines apply to all user-facing text in documentation:

### 1. Be clear and succinct

- Say only what's needed and avoid filler.

### 2. Use American English

- Use American spelling and grammar conventions.

### 3. Use plain language

- Write as simply as possible while remaining accurate, e.g. "use" instead of "utilize".
- Avoid jargon, internal terminology, or implementation details unless they help users act or understand risk.
- Define technical terms on first use.

### 4. Stay calm and neutral

- Avoid exclamation marks (!) and dramatic phrasing ("Tread carefully").
- Be factual, not emotional.
- Example: "This cannot be undone." is calm and clear; "You will not be able to recover this data!" casts blame and sounds like a panic alarm.

### 5. Addressing users (context-dependent)

- **UI Copy and Labels**: Avoid "you", "your" where possible. Focus on the feature or behavior.
  - Example: "Automatically deletes packages that match the configured query and exceed defined limits for count, age, or total size." focuses on the behavior.
- **Procedural Documentation**: Allow "you" when it improves clarity and natural flow in step-by-step instructions.
  - Example: "Click the Download button" or "You can download packages using the CLI."
- **General Rule**: When in doubt, prefer third-person or imperative voice over second-person.

### 6. Use sentence case for documentation headings

- Capitalize only the first word and proper nouns in headings (sentence case).
- Only capitalize proper nouns or product names in body text.
- Example heading: "Regenerate GPG key"
- Example body text: "Regenerate GPG key" (sentence case)

### 7. Be specific about actions and consequences

- Say exactly what will change and what will stay the same.
- If something is irreversible or risky, say it once, plainly.
- Prefer concrete subjects and objects over abstractions.
- Example:
  > Regenerating the key keeps the public key and deletes the private key. Old packages will not be re-signed. This cannot be undone.

### 8. Use active language and offer clear next steps

- Lead with the action: "Delete package" not "Package will be deleted."
- Tell users what will happen after the action and how to verify it where possible.
- For errors, say how to fix it and, when possible, name the action: "Retry upload," "Add permission," "Reconnect."
- For confirmations, be specific: what succeeded and where to see it.
- Examples:
  - Error: "File size too large."
  - Success: "Package deleted."
  - Guidance: "Run `cloudsmith whoami` to confirm the CLI is connected."

### 9. Explain the value of new or unfamiliar features

- Start with the benefit in one sentence, then explain how it works.
- Keep it short. Avoid marketing language.
- If there's timing or prerequisites, include them.
- Examples:
  - Before: "Create a new vulnerability policy or edit an existing one. New policies are evaluated and enforced after a scheduled security scan."
  - After: "Vulnerability policies help keep software secure by blocking risky packages. Policies are evaluated and enforced after each scheduled security scan."

## Technical writing best practices

### Structure and organization

Follow this standard flow for procedural documentation:

1. **Prerequisites** (if applicable)
   - List required knowledge, tools, or setup
   - Use bullet points for clarity

2. **Steps**
   - Number steps when order matters
   - Use bullet points for unordered items
   - Break complex procedures into logical sections

3. **Troubleshooting** (if applicable)
   - Address common issues
   - Provide solutions, not just problem descriptions

### Scannability

- Use **bold** for key terms, important concepts, and UI element names
- Use bullet points for lists
- Use numbered lists for sequential steps
- Use clear, descriptive headings
- Break up long paragraphs (aim for 3-5 sentences max)

### Code examples

- Include working, tested code examples where possible
- Use syntax highlighting appropriate to the language
- Include comments in code when they add clarity
- Show complete examples, not fragments, when possible
- Explain what the code does, not just show it

### Anticipate user confusion

- Include notes to address potential errors or misunderstandings
- Use the `<Note>` component for important clarifications
- Use `<Note variant="warning">` for potential issues
- Use `<Note variant="caution">` for irreversible actions
- Example: "Note: You may see an error here if the repository doesn't exist."

### Terminology and definitions

- Define terms on first use when they may be unfamiliar
- Use consistent terminology throughout
- Prefer Cloudsmith-specific terms (see Cloudsmith-Specific Conventions below)

### Writing inclusive documentation

Prioritize inclusivity in all documentation. Adhere to the [Google Developer Documentation Style Guide](https://developers.google.com/style)—specifically the section on [inclusive writing](https://developers.google.com/style/inclusive-documentation). Ensure all content avoids ableist, biased, or gendered language and uses diverse, representative examples.


## Cloudsmith-specific conventions

### Terminology

#### Workspace (preferred term)

- **Always prefer "Workspace"** over "Organization," "Namespace," or "Owner."
- If an alternative appears in the referenced feature, code example, or UI element, clarify that it is synonymous with Workspace.
- Example: "The API endpoint uses `organization` as a parameter name, which refers to your Cloudsmith Workspace."

#### Other Cloudsmith terms

- **Repository** (or "repo"): Storage location for software packages and containers
- **Package**: Individual artifact stored in a repository
- **Entitlement Token**: Token for external, read-only access to private repositories
- **Upstream**: External source that a repository proxies or mirrors

### Capitalization

- **Product Names**: Cloudsmith (always capitalized)
- **Feature Names**: Capitalize feature names when referring to them as proper nouns (e.g., "Vulnerability Policies", "Retention Rules")
- **UI Elements**: Capitalize UI element names when referring to them directly (e.g., "Click the Download button")
- **Code and Commands**: Use code formatting for code, commands, and technical terms

### Formatting

- Use backticks for: code, commands, file names, API endpoints, parameter names
- Use **bold** for: UI element names, important concepts, key terms
- Use *italics* sparingly: for emphasis or when introducing new terms

## Documentation structure patterns

### Procedural guide pattern

```markdown
# [Task Name]

[Brief introduction explaining what this guide covers and why it's useful.]

## Prerequisites

- [Requirement 1]
- [Requirement 2]

## Steps

### Step 1: [Action]

[Description and instructions]

### Step 2: [Action]

[Description and instructions]

## Troubleshooting

### [Common Issue]

[Solution]
```

### Reference documentation pattern

```markdown
# [Feature Name]

[Brief description of the feature and its purpose.]

## Overview

[Detailed explanation]

## Configuration

[Configuration options]

## Examples

[Code examples]
```

## Examples

### Before and after comparisons

| **Before** | **After** |
|------------|-----------|
| This is a public package | Public package |
| Copy to Clipboard | Copy |
| **Regenerate GPG key**<br>Are you **absolutely** sure you want to update sign key settings? If you regenerate the **GPG key**, we retain the public key for the old key, but delete the private key. This will not be recoverable. When a new key is added, we do not automatically re-sign old packages, although repository indexes will use the new key. Tread carefully. | **Regenerate GPG key**<br>This will retain the public key and delete the private key. When a new key is added, old packages will not be automatically re-signed, but repository indexes will use the new key. This cannot be undone. |
| ✅ Enable write | ✅ Write |
| **Usage Restrictions**<br>Limit the token usability by time or usage, until it is reset by a user or the configured refresh period elapses. | **Usage Restrictions**<br>Limit by time or usage. Limits are reset after the configured refresh period ({X} hours/days/weeks) or can be reset manually. |
| **Make Repository Public**<br>Are you **absolutely** sure you want to make repository **Jason Test** *public*? | **Broadcast**<br>1340 packages in Jason Test will be visible to anyone on the internet. |
| Create a new vulnerability policy or edit an existing one. New policies are evaluated and enforced after a scheduled security scan. | Vulnerability policies help keep software secure by blocking risky packages. Policies are evaluated and enforced after each scheduled security scan. |

### Documentation examples

#### Good: clear, scannable, action-oriented

```markdown
# Download a package

Download packages from Cloudsmith repositories using native package managers or the web interface.

## Prerequisites

- Access to the repository
- Appropriate permissions (read access for private repositories)

## Download via native package manager

1. Navigate to the repository.
2. Click **Push/Pull Packages**.
3. Select your package manager format.
4. Follow the setup instructions in the **Pull Package** tab.
```

#### Poor: vague, unclear, passive

```markdown
# Package downloading

Packages can be downloaded from repositories. There are different ways to do this. You might want to use a package manager or the website. Make sure you have the right permissions first.
```

## Quick reference checklist

When writing or reviewing documentation, ensure:

- [ ] Uses American English spelling
- [ ] Active voice throughout
- [ ] Clear, concise language (no filler)
- [ ] "Workspace" used instead of "Organization"/"Namespace"/"Owner" (unless in API/UI context)
- [ ] Sentence case for headings
- [ ] Proper formatting (backticks for code, bold for UI elements)
- [ ] Scannable structure (headings, bullets, short paragraphs)
- [ ] Clear next steps or actions
- [ ] Anticipates user confusion with notes where needed
- [ ] Consistent terminology
- [ ] Working code examples (if applicable)
- [ ] No exclamation marks or dramatic phrasing

## Additional resources

- [Google Developer Documentation Style Guide](https://developers.google.com/style)
- [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/)
- [Merriam-Webster Dictionary](https://www.merriam-webster.com/)

---

**Note for Agents/LLMs**: When generating or reviewing documentation, reference this guide first. If a guideline conflicts with the Google Style Guide, follow this guide (Cloudsmith-specific takes precedence). Always prioritize clarity, scannability, and user actionability. If something isn't clear when being asked to complete a documentation task, highlight it and ask for feedback as to what should be done, referring to this guide if required.

