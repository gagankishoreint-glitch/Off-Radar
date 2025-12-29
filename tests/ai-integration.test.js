// Automated Tests for AI Integration
// Tests all AI features with and without configuration

const fetch = require('node-fetch');

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

// ANSI color codes for terminal output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[36m',
    reset: '\x1b[0m',
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// Test results tracker
const results = {
    passed: 0,
    failed: 0,
    skipped: 0,
};

async function test(name, testFn) {
    try {
        log(`\n▶ Testing: ${name}`, 'blue');
        await testFn();
        log(`✓ PASSED: ${name}`, 'green');
        results.passed++;
    } catch (error) {
        log(`✗ FAILED: ${name}`, 'red');
        log(`  Error: ${error.message}`, 'red');
        results.failed++;
    }
}

// Helper to assert
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

// ============================================
// TEST SUITE
// ============================================

async function runTests() {
    log('\n' + '='.repeat(60), 'yellow');
    log('  AI INTEGRATION TEST SUITE', 'yellow');
    log('='.repeat(60) + '\n', 'yellow');

    // Test 1: Homepage loads
    await test('Homepage loads successfully', async () => {
        const response = await fetch(BASE_URL);
        assert(response.ok, `Homepage returned ${response.status}`);
        const html = await response.text();
        assert(html.includes('Off-Radar'), 'Homepage should contain title');
    });

    // Test 2: AI Career Chat endpoint exists
    await test('AI Career Chat endpoint exists', async () => {
        const response = await fetch(`${BASE_URL}/api/ai/career-chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'test' }),
        });
        assert(response.status === 503 || response.status === 200,
            `Expected 503 (not configured) or 200 (configured), got ${response.status}`);
        const data = await response.json();
        assert(data !== null, 'Response should return JSON');
    });

    // Test 3: AI Resume Analysis endpoint exists
    await test('AI Resume Analysis endpoint exists', async () => {
        const response = await fetch(`${BASE_URL}/api/ai/analyze-resume`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resumeText: 'Test resume content' }),
        });
        assert(response.status === 503 || response.status === 200,
            `Expected 503 (not configured) or 200 (configured), got ${response.status}`);
    });

    // Test 4: AI Offer Comparison endpoint exists
    await test('AI Offer Comparison endpoint exists', async () => {
        const response = await fetch(`${BASE_URL}/api/ai/compare-offers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                offer1: { company: 'Google', ctc: 2000000, role: 'SWE', location: 'Bangalore', type: 'fte', workMode: 'hybrid' },
                offer2: { company: 'Microsoft', ctc: 1800000, role: 'SWE', location: 'Hyderabad', type: 'fte', workMode: 'hybrid' },
            }),
        });
        assert(response.status === 503 || response.status === 200,
            `Expected 503 (not configured) or 200 (configured), got ${response.status}`);
    });

    // Test 5: Enhanced Parse Resume endpoint (backward compatibility)
    await test('Parse Resume endpoint maintains backward compatibility', async () => {
        // This test would need an actual file, so we just check the endpoint exists
        const response = await fetch(`${BASE_URL}/api/parse-resume`, {
            method: 'POST',
            body: new FormData(), // Empty form
        });
        assert(response.status === 400, 'Should return 400 for missing file');
        const data = await response.json();
        assert(data.error === 'No file uploaded', 'Should have correct error message');
    });

    // Test 6: Graceful degradation - endpoints return proper messages when AI not configured
    await test('Endpoints gracefully degrade without AI config', async () => {
        const response = await fetch(`${BASE_URL}/api/ai/career-chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'test' }),
        });
        const data = await response.json();

        if (response.status === 503) {
            assert(data.error && data.configured === false,
                'Should return error message and configured=false when AI not set up');
            log('  └─ AI not configured (expected for local dev)', 'yellow');
        } else {
            log('  └─ AI is configured and working!', 'green');
        }
    });

    // Test 7: Build artifacts exist
    await test('Build artifacts exist', async () => {
        const fs = require('fs');
        const path = require('path');

        const criticalFiles = [
            'src/lib/firebase/config.ts',
            'src/lib/firebase/admin.ts',
            'src/lib/ai/gemini-client.ts',
            'src/lib/db/schema.ts',
            'src/app/api/ai/career-chat/route.ts',
            'src/app/api/ai/analyze-resume/route.ts',
            'src/app/api/ai/compare-offers/route.ts',
            'src/components/ai/CareerChatbot.tsx',
            'src/components/ai/AIStatusBadge.tsx',
            'docs/FIREBASE_SETUP.md',
            '.env.example',
        ];

        for (const file of criticalFiles) {
            const filePath = path.join(__dirname, '..', file);
            assert(fs.existsSync(filePath), `File should exist: ${file}`);
        }
    });

    // Test 8: Package.json has required dependencies
    await test('Required dependencies are installed', async () => {
        const fs = require('fs');
        const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

        const requiredDeps = ['firebase', 'firebase-admin', '@google-cloud/vertexai', 'zod'];
        for (const dep of requiredDeps) {
            assert(packageJson.dependencies[dep], `Dependency ${dep} should be in package.json`);
        }
    });

    // Test 9: README updated with AI features
    await test('README contains AI features documentation', async () => {
        const fs = require('fs');
        const readme = fs.readFileSync('./README.md', 'utf8');

        assert(readme.includes('AI-Powered'), 'README should mention AI features');
        assert(readme.includes('FIREBASE_SETUP.md'), 'README should link to setup guide');
        assert(readme.includes('Vertex AI'), 'README should mention Vertex AI');
    });

    // Test 10: Architecture docs updated
    await test('Architecture documentation updated', async () => {
        const fs = require('fs');
        const arch = fs.readFileSync('./docs/ARCHITECTURE.md', 'utf8');

        assert(arch.includes('Firebase'), 'Architecture should document Firebase');
        assert(arch.includes('Vertex AI'), 'Architecture should document Vertex AI');
        assert(arch.includes('Graceful Degradation'), 'Architecture should explain fallback behavior');
    });

    // ============================================
    // SUMMARY
    // ============================================
    log('\n' + '='.repeat(60), 'yellow');
    log('  TEST RESULTS', 'yellow');
    log('='.repeat(60), 'yellow');
    log(`\n  Passed:  ${results.passed}`, 'green');
    log(`  Failed:  ${results.failed}`, results.failed > 0 ? 'red' : 'reset');
    log(`  Skipped: ${results.skipped}`, 'yellow');
    log(`  Total:   ${results.passed + results.failed + results.skipped}\n`);

    if (results.failed === 0) {
        log('✓ All tests passed!', 'green');
        process.exit(0);
    } else {
        log('✗ Some tests failed', 'red');
        process.exit(1);
    }
}

// Run tests
runTests().catch((error) => {
    log(`\n✗ Test suite crashed: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
});
