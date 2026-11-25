/**
 * gen_stubs.js — Idempotent Note Stub Generator
 * Reads YAML syllabus data and creates Markdown stub files for each topic.
 * SAFE: Never overwrites files that already contain human-written content.
 *
 * Usage: node scripts/gen_stubs.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

const STUB_MARKER = '<!-- STUB:AUTO-GENERATED -->';

function isStubOnly(filePath) {
  if (!fs.existsSync(filePath)) return true; // doesn't exist = safe to create
  const content = fs.readFileSync(filePath, 'utf-8');
  return content.includes(STUB_MARKER);
}

function generateStubContent(meta) {
  const frontmatter = [
    '---',
    `course: "${meta.course}"`,
    `semester: ${meta.semester}`,
    `paper_code: "${meta.paper_code}"`,
    `paper_name: "${meta.paper_name}"`,
    `unit: ${meta.unit}`,
    `unit_title: "${meta.unit_title}"`,
    `topic: "${meta.topic.replace(/"/g, '\\"')}"`,
    `status: "draft"`,
    `author: ""`,
    `verifier: ""`,
    `updated: ""`,
    `tags: ["${meta.course.toLowerCase()}", "sem-${meta.semester}", "${meta.paper_code.toLowerCase()}"]`,
    '---',
  ].join('\n');

  const body = `
${STUB_MARKER}

# ${meta.topic}

> **Paper**: ${meta.paper_code} — ${meta.paper_name}  
> **Unit ${meta.unit}**: ${meta.unit_title}  
> **Status**: 🔴 Draft — awaiting contributor  

---

## Definition

_Write a clear academic definition of "${meta.topic}" here._

---

## Key Concepts / Models

- Point 1
- Point 2
- Point 3

---

## Diagram

\`\`\`mermaid
graph TD
    A["${meta.topic.substring(0, 30)}..."] --> B["Concept 1"]
    A --> C["Concept 2"]
    A --> D["Concept 3"]
\`\`\`

---

## Examples (Chhattisgarh / India Context)

_Provide real-world examples relevant to Chhattisgarh and Indian media landscape._

1. Example 1
2. Example 2

---

## Exam-Style Questions

### Short Answer (5 marks — ≤100 words)

1. Define "${meta.topic}" in brief.
2. _(Add more short questions)_

### Long Answer (10 marks)

1. Discuss the concept of "${meta.topic}" with suitable examples.
2. _(Add more long answer questions)_

---

## Further Reading

- _Recommend textbook chapters, journal articles, or web resources._

---

## References

- _List all sources cited in this note._

---

> **How to contribute**: Replace this stub content with your notes. Keep the frontmatter intact. Change \`status\` from "draft" to "review" when ready.  
> See [Contribution Guide](/ktujm/contribute/) for detailed instructions.
`;

  return frontmatter + '\n' + body;
}

function main() {
  const syllabusDir = path.join(ROOT, 'content', 'syllabus');
  const yamlFiles = fs.readdirSync(syllabusDir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));

  let totalCreated = 0;
  let totalSkipped = 0;
  let totalExisting = 0;

  for (const yamlFile of yamlFiles) {
    const filePath = path.join(syllabusDir, yamlFile);
    const data = yaml.load(fs.readFileSync(filePath, 'utf-8'));
    const courseName = data.course.toLowerCase();

    console.log(`\nProcessing: ${data.course_full_name} (${data.course})`);

    for (const sem of data.semesters) {
      for (const paper of sem.papers) {
        for (const unit of paper.units) {
          for (const topic of unit.topics) {
            const topicSlug = slugify(topic);
            const noteDir = path.join(
              ROOT, 'content', 'notes', courseName,
              `sem-${sem.semester}`,
              paper.paper_code.toLowerCase(),
              `unit-${unit.unit}`
            );
            const notePath = path.join(noteDir, `${topicSlug}.md`);

            if (!fs.existsSync(noteDir)) {
              fs.mkdirSync(noteDir, { recursive: true });
            }

            if (isStubOnly(notePath)) {
              const content = generateStubContent({
                course: data.course,
                semester: sem.semester,
                paper_code: paper.paper_code,
                paper_name: paper.paper_name,
                unit: unit.unit,
                unit_title: unit.title,
                topic: topic,
              });
              fs.writeFileSync(notePath, content, 'utf-8');
              totalCreated++;
            } else {
              totalExisting++;
              console.log(`  SKIP (human content): ${notePath}`);
            }
          }
        }
      }
    }
  }

  console.log(`\n========================================`);
  console.log(`Stub Generation Complete!`);
  console.log(`  Created/Updated stubs: ${totalCreated}`);
  console.log(`  Skipped (human content): ${totalExisting}`);
  console.log(`========================================`);
}

main();
