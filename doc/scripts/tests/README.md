# Unit Tests for Optics Textbook Scripts

This directory contains unit tests for the utility scripts.

## Running Tests

### Prerequisites

Install pytest:

```bash
pip install pytest
```

Or install all requirements:

```bash
pip install -r requirements.txt
```

### Run All Tests

```bash
# From project root
pytest scripts/tests/

# With verbose output
pytest scripts/tests/ -v

# With coverage report
pytest scripts/tests/ --cov=scripts --cov-report=html
```

### Run Specific Test File

```bash
pytest scripts/tests/test_shared_utils.py -v
```

### Run Specific Test Class or Function

```bash
# Run specific test class
pytest scripts/tests/test_shared_utils.py::TestToSnakeCase -v

# Run specific test function
pytest scripts/tests/test_shared_utils.py::TestToSnakeCase::test_basic_camel_case -v
```

## Test Structure

- `test_shared_utils.py` - Tests for `shared_utils.py` module
    - String manipulation functions
    - Validation functions
    - Path handling
    - Exception classes

## Writing New Tests

When adding new functions to shared_utils or other modules, add corresponding
tests:

```python
class TestYourFunction:
    """Tests for your_function."""

    def test_basic_case(self):
        assert your_function("input") == "expected"

    def test_edge_case(self):
        with pytest.raises(SomeError):
            your_function("invalid_input")
```

## Continuous Integration

These tests can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run tests
  run: |
    pip install -r requirements.txt
    pytest scripts/tests/ -v
```
