function escapeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const testCases = [
  {
    name: 'Basic XSS',
    input: '<script>alert(1)</script>',
    expected: '&lt;script&gt;alert(1)&lt;/script&gt;'
  },
  {
    name: 'Attribute Injection',
    input: '"><img src=x onerror=alert(1)>',
    expected: '&quot;&gt;&lt;img src=x onerror=alert(1)&gt;'
  },
  {
    name: 'Single Quote',
    input: "' OR 1=1",
    expected: '&#39; OR 1=1'
  },
  {
    name: 'Ampersand',
    input: 'Fish & Chips',
    expected: 'Fish &amp; Chips'
  },
  {
    name: 'Complex Payload',
    input: '<svg/onload=alert`1` xmlns="http://www.w3.org/2000/svg">',
    expected: '&lt;svg/onload=alert`1` xmlns=&quot;http://www.w3.org/2000/svg&quot;&gt;'
  }
];

let failed = false;
for (const tc of testCases) {
  const result = escapeHTML(tc.input);
  if (result === tc.expected) {
    console.log(`✅ PASS: ${tc.name}`);
  } else {
    console.log(`❌ FAIL: ${tc.name}`);
    console.log(`   Input:    ${tc.input}`);
    console.log(`   Expected: ${tc.expected}`);
    console.log(`   Result:   ${result}`);
    failed = true;
  }
}

if (failed) {
  Deno.exit(1);
} else {
  console.log('\nAll XSS verification tests passed!');
}
