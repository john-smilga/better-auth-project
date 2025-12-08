# Django + DRF Generic Structure Guide

This guide documents the recommended folder structure for organizing Django apps, models, serializers, views, services, permissions, and tests in a Django REST Framework (DRF) project with Python, Black, Ruff, and MyPy.

## Tech Stack

- **Django** - Web framework
- **Django REST Framework (DRF)** - API framework
- **Python** - Programming language
- **Black** - Code formatter
- **Ruff** - Linter
- **MyPy** - Static type checker
- **Pytest** - Testing framework (recommended)
- **Django Test Client** - Alternative testing framework

## Naming Conventions

**All file names must use snake_case** (Python convention):

✅ **Good**: `user_service.py`, `store_serializer.py`, `auth_permissions.py`
❌ **Bad**: `UserService.py`, `storeSerializer.py`, `authPermissions.py`

**Exception**: Django app names use lowercase with underscores (e.g., `user_auth`, `store_management`).

## Core Principle

**Apps are domain boundaries; URLs are API endpoints. They don't need to match exactly.**

- URLs reflect the API endpoint hierarchy (e.g., `/api/stores/`, `/api/stores/{id}/products/`)
- Apps reflect domain boundaries and business logic (e.g., `auth`, `stores`, `products`)
- A single app can expose multiple API endpoints
- URLs compose app functionality, but apps don't know about URL structure

## Complete Folder Structure

```
project/
├── manage.py
├── requirements.txt
├── requirements-dev.txt
├── pyproject.toml                      # Black, Ruff, MyPy config
├── pytest.ini                          # Pytest configuration
├── .env.example                         # Environment variables template
├── .gitignore
├── README.md
│
├── config/                              # Project configuration (Django settings)
│   ├── __init__.py
│   ├── settings/
│   │   ├── __init__.py
│   │   ├── base.py                     # Base settings
│   │   ├── development.py              # Development settings
│   │   ├── production.py                # Production settings
│   │   └── testing.py                   # Testing settings
│   ├── urls.py                         # Root URL configuration
│   └── wsgi.py                         # WSGI config
│
├── apps/                                # Django apps (domain-based)
│   ├── __init__.py
│   │
│   ├── auth/                           # Authentication app
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   │
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── user.py                 # Custom user model (if needed)
│   │   │
│   │   ├── serializers/
│   │   │   ├── __init__.py
│   │   │   ├── user_serializer.py
│   │   │   ├── login_serializer.py
│   │   │   ├── register_serializer.py
│   │   │   └── token_serializer.py
│   │   │
│   │   ├── views/
│   │   │   ├── __init__.py
│   │   │   ├── user_viewset.py
│   │   │   ├── auth_viewset.py
│   │   │   └── token_viewset.py
│   │   │
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── user_service.py
│   │   │   ├── auth_service.py
│   │   │   └── token_service.py
│   │   │
│   │   ├── permissions/
│   │   │   ├── __init__.py
│   │   │   └── user_permissions.py
│   │   │
│   │   ├── urls.py
│   │   │
│   │   ├── migrations/
│   │   │   └── __init__.py
│   │   │
│   │   └── tests/
│   │       ├── __init__.py
│   │       ├── test_models.py
│   │       ├── test_serializers.py
│   │       ├── test_views.py
│   │       ├── test_services.py
│   │       ├── test_permissions.py
│   │       └── conftest.py             # Pytest fixtures
│   │
│   ├── stores/                          # Stores app
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   │
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── store.py
│   │   │
│   │   ├── serializers/
│   │   │   ├── __init__.py
│   │   │   ├── store_serializer.py
│   │   │   └── store_list_serializer.py
│   │   │
│   │   ├── views/
│   │   │   ├── __init__.py
│   │   │   └── store_viewset.py
│   │   │
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   └── store_service.py
│   │   │
│   │   ├── permissions/
│   │   │   ├── __init__.py
│   │   │   └── store_permissions.py
│   │   │
│   │   ├── urls.py
│   │   │
│   │   ├── migrations/
│   │   │   └── __init__.py
│   │   │
│   │   └── tests/
│   │       ├── __init__.py
│   │       ├── test_models.py
│   │       ├── test_serializers.py
│   │       ├── test_views.py
│   │       ├── test_services.py
│   │       ├── test_permissions.py
│   │       └── conftest.py
│   │
│   └── products/                        # Products app
│       ├── __init__.py
│       ├── admin.py
│       ├── apps.py
│       │
│       ├── models/
│       │   ├── __init__.py
│       │   └── product.py
│       │
│       ├── serializers/
│       │   ├── __init__.py
│       │   ├── product_serializer.py
│       │   └── product_list_serializer.py
│       │
│       ├── views/
│       │   ├── __init__.py
│       │   └── product_viewset.py
│       │
│       ├── services/
│       │   ├── __init__.py
│       │   └── product_service.py
│       │
│       ├── permissions/
│       │   ├── __init__.py
│       │   └── product_permissions.py
│       │
│       ├── urls.py
│       │
│       ├── migrations/
│       │   └── __init__.py
│       │
│       └── tests/
│           ├── __init__.py
│           ├── test_models.py
│           ├── test_serializers.py
│           ├── test_views.py
│           ├── test_services.py
│           ├── test_permissions.py
│           └── conftest.py
│
├── common/                              # Shared utilities across apps
│   ├── __init__.py
│   ├── exceptions.py                   # Custom exceptions
│   ├── pagination.py                   # DRF pagination classes
│   ├── permissions.py                  # Shared permission classes
│   ├── mixins.py                        # DRF view mixins
│   └── utils.py                         # General utilities
│
├── lib/                                 # Third-party integrations
│   ├── __init__.py
│   └── external_services/               # External API clients
│       ├── __init__.py
│       └── payment_gateway.py
│
└── scripts/                             # Management scripts
    ├── __init__.py
    └── seed_data.py                     # Data seeding script
```

## Testing File Organization

### Test Structure Pattern

Each app has a `tests/` directory with test files organized by layer:

```
apps/auth/tests/
├── __init__.py
├── test_models.py                      # Model tests
├── test_serializers.py                  # Serializer tests
├── test_views.py                        # View/ViewSet tests
├── test_services.py                    # Service tests
├── test_permissions.py                 # Permission tests
└── conftest.py                         # Pytest fixtures
```

**Benefits:**
- Tests are co-located with app code (easy to find)
- Clear separation by layer (models, serializers, views, services)
- Easy to run tests for specific layers
- Matches Django app structure

### Test File Naming

All test files use snake_case with `test_` prefix:

✅ **Good**: `test_user_service.py`, `test_store_viewset.py`, `test_auth_permissions.py`
❌ **Bad**: `testUserService.py`, `TestStoreViewset.py`, `test_authPermissions.py`

## App Organization Principles

### 1. Domain-Based, Not URL-Based

Apps are organized by business domain, not by URL structure:

✅ **Good**: `apps/auth/`, `apps/stores/`, `apps/products/` (domain boundaries)
❌ **Bad**: `apps/api/stores/` (mirroring URLs)

### 2. Self-Contained Apps

Each app contains everything it needs:

- `models/` - Database models (can be single file or module)
- `serializers/` - DRF serializers for input/output
- `views/` - DRF viewsets and views
- `services/` - Business logic (thin views, fat services)
- `permissions/` - DRF permission classes
- `urls.py` - App URL configuration
- `tests/` - All tests for the app

### 3. Model Organization

Models can be in a single `models.py` file or split into a `models/` module:

**Single file (for simple apps):**
```
apps/auth/models.py
```

**Module (for complex apps):**
```
apps/auth/models/
├── __init__.py
├── user.py
└── token.py
```

### 4. Service Organization

Services contain all business logic:

```
apps/stores/services/
├── __init__.py
└── store_service.py
```

Services should be:
- Pure or side-effect-light where possible
- Easy to test
- Reused across multiple views/serializers
- Accept explicit arguments (not request objects directly)

## Serializer Organization

Serializers are organized by entity and purpose:

```
apps/stores/serializers/
├── __init__.py
├── store_serializer.py                 # Detail serializer
└── store_list_serializer.py            # List serializer (optimized)
```

### Serializer Patterns

- **Detail serializers**: Full representation with all fields and relationships
- **List serializers**: Optimized for list views (fewer fields, no nested objects)
- **Create/Update serializers**: Separate serializers for write operations if needed
- **Nested serializers**: For related objects (use sparingly to avoid N+1)

## View Organization

Views use DRF ViewSets for standard CRUD:

```
apps/stores/views/
├── __init__.py
└── store_viewset.py
```

### View Patterns

- **ViewSets**: Use `ModelViewSet` or `ReadOnlyModelViewSet` for standard CRUD
- **Custom actions**: Use `@action` decorator for custom endpoints
- **Thin views**: Views orchestrate (authenticate → authorize → call service → serialize)
- **No business logic**: All business rules live in services

## Service Organization

Services contain all business logic:

```
apps/stores/services/
├── __init__.py
└── store_service.py
```

### Service Patterns

- **Pure functions**: Prefer pure functions when possible
- **Explicit arguments**: Pass data explicitly, don't access request directly
- **Error handling**: Raise custom exceptions for business rule violations
- **Reusability**: Services can be called from views, tasks, management commands

### Service Example

```python
# apps/stores/services/store_service.py
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from apps.stores.models import Store

def create_store(name: str, owner_id: int, description: str | None = None) -> "Store":
    """Create a new store with business rule validation."""
    # Business logic here
    # Validation
    # Creation
    # Return model instance
    pass

def update_store(store_id: int, **updates: dict) -> "Store":
    """Update store with business rule validation."""
    # Business logic here
    pass
```

## Permission Organization

Permissions are organized by app:

```
apps/stores/permissions/
├── __init__.py
└── store_permissions.py
```

### Permission Patterns

- **Custom permission classes**: Extend DRF `BasePermission`
- **Reusable permissions**: Place in app's `permissions/` module
- **Shared permissions**: Place in `common/permissions.py`
- **Avoid inline logic**: Don't put permission logic directly in views

## URL Routing

### App URLs

Each app defines its own URL patterns:

```python
# apps/stores/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter
from apps.stores.views import StoreViewSet

router = DefaultRouter()
router.register(r'stores', StoreViewSet, basename='store')

urlpatterns = router.urls
```

### Root URLs

Root URL configuration includes all app URLs:

```python
# config/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.auth.urls')),
    path('api/stores/', include('apps.stores.urls')),
    path('api/products/', include('apps.products.urls')),
]
```

### URL Naming

Use descriptive route names:

✅ **Good**: `store-detail`, `store-list`, `product-category-list`
❌ **Bad**: `detail`, `list`, `category`

## Settings Organization

Settings are split by environment:

```
config/settings/
├── __init__.py
├── base.py                             # Common settings
├── development.py                      # Development overrides
├── production.py                       # Production overrides
└── testing.py                          # Testing overrides
```

### Settings Pattern

```python
# config/settings/base.py
# All common settings

# config/settings/development.py
from .base import *

DEBUG = True
# Development-specific settings

# config/settings/production.py
from .base import *

DEBUG = False
# Production-specific settings
```

## Migration Organization

Migrations are auto-generated and live in each app's `migrations/` directory:

```
apps/stores/migrations/
├── __init__.py
├── 0001_initial.py
├── 0002_add_store_description.py
└── 0003_add_store_owner.py
```

### Migration Rules

- **Never modify historical migrations** (unless absolutely unavoidable)
- **Use descriptive names**: `0002_add_store_description.py`
- **Backwards-compatible changes**: Favor multi-step migrations for risky changes
- **Data migrations**: Use `RunPython` with idempotent functions

## Import Patterns

### ✅ Good Import Patterns

- Import from apps: `from apps.stores.models import Store`
- Import services: `from apps.stores.services import store_service`
- Import serializers: `from apps.stores.serializers import StoreSerializer`
- Use absolute imports (configured in settings)

### ❌ Bad Import Patterns

- Don't use relative imports beyond `./` or `../`
- Don't import from migrations
- Don't mix app boundaries unnecessarily
- Don't use wildcard imports (`from x import *`)

## Testing Setup

### Pytest Configuration

Create `pytest.ini`:

```ini
[pytest]
DJANGO_SETTINGS_MODULE = config.settings.testing
python_files = tests.py test_*.py
python_classes = Test*
python_functions = test_*
addopts = 
    --reuse-db
    --nomigrations
    --tb=short
```

### Test Utilities

Create `common/test_utils.py` for shared test utilities:

```python
# common/test_utils.py
import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()

@pytest.fixture
def api_client():
    """DRF API client for testing."""
    return APIClient()

@pytest.fixture
def authenticated_client(api_client, user):
    """Authenticated API client."""
    api_client.force_authenticate(user=user)
    return api_client

@pytest.fixture
def user(db):
    """Create a test user."""
    return User.objects.create_user(
        username='testuser',
        email='test@example.com',
        password='testpass123'
    )
```

### Test Organization by Layer

#### Model Tests

```python
# apps/stores/tests/test_models.py
import pytest
from apps.stores.models import Store

@pytest.mark.django_db
class TestStoreModel:
    def test_store_creation(self):
        """Test store model creation."""
        store = Store.objects.create(name='Test Store')
        assert store.name == 'Test Store'
```

#### Serializer Tests

```python
# apps/stores/tests/test_serializers.py
import pytest
from apps.stores.serializers import StoreSerializer

@pytest.mark.django_db
class TestStoreSerializer:
    def test_store_serializer_valid_data(self):
        """Test store serializer with valid data."""
        data = {'name': 'Test Store', 'description': 'Test'}
        serializer = StoreSerializer(data=data)
        assert serializer.is_valid()
```

#### View Tests

```python
# apps/stores/tests/test_views.py
import pytest
from rest_framework import status
from apps.stores.models import Store

@pytest.mark.django_db
class TestStoreViewSet:
    def test_list_stores(self, authenticated_client):
        """Test listing stores."""
        Store.objects.create(name='Store 1')
        Store.objects.create(name='Store 2')
        
        response = authenticated_client.get('/api/stores/')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) == 2
```

#### Service Tests

```python
# apps/stores/tests/test_services.py
import pytest
from apps.stores.services import store_service

@pytest.mark.django_db
class TestStoreService:
    def test_create_store(self, user):
        """Test store creation service."""
        store = store_service.create_store(
            name='Test Store',
            owner_id=user.id,
            description='Test description'
        )
        assert store.name == 'Test Store'
        assert store.owner_id == user.id
```

## When to Split Apps

Split apps when:

1. **Domain Independence**: The app can function independently
2. **Complex Functionality**: The app has substantial logic
3. **Team Ownership**: Different teams own different apps
4. **Reusability**: The app is used in multiple contexts

Keep together when:

1. **Tight Coupling**: Apps are always used together
2. **Simple Functionality**: The app is small and simple
3. **Single Context**: The app is only used in one place

## Code Quality Tools

### Black Configuration

Create `pyproject.toml`:

```toml
[tool.black]
line-length = 88
target-version = ['py311']
include = '\.pyi?$'
```

### Ruff Configuration

Add to `pyproject.toml`:

```toml
[tool.ruff]
line-length = 88
target-version = "py311"

[tool.ruff.lint]
select = ["E", "F", "I", "N", "W", "UP"]
ignore = []

[tool.ruff.lint.isort]
known-first-party = ["apps", "config", "common"]
```

### MyPy Configuration

Add to `pyproject.toml`:

```toml
[tool.mypy]
python_version = "3.11"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true
disallow_incomplete_defs = true
check_untyped_defs = true
no_implicit_optional = true
warn_redundant_casts = true
warn_unused_ignores = true
warn_no_return = true

[[tool.mypy.overrides]]
module = [
    "django.*",
    "rest_framework.*",
]
ignore_missing_imports = true
```

## Benefits

1. **Separation of Concerns**: Views handle HTTP, services handle business logic
2. **Reusability**: Services can be used across views, tasks, and commands
3. **Maintainability**: Clear boundaries make code easier to understand
4. **Testability**: Each layer can be tested independently
5. **Scalability**: Easy to add new apps without affecting existing ones
6. **Team Collaboration**: Different teams can work on different apps
7. **Code Quality**: Black, Ruff, and MyPy ensure consistent, type-safe code
8. **Django Best Practices**: Follows Django and DRF conventions

## Summary

- **Apps** = Domain boundaries (business logic, self-contained)
- **Models** = Database schema (single file or module)
- **Serializers** = Input/output validation and transformation
- **Views** = HTTP request/response handling (thin, orchestration only)
- **Services** = Business logic (reusable, testable)
- **Permissions** = Authorization logic (reusable permission classes)
- **Tests** = Organized by layer (models, serializers, views, services)
- **URLs** = API endpoint routing (descriptive names)
- **Settings** = Environment-specific configuration
- **Naming** = All files use snake_case (Python convention)

This structure keeps your codebase organized, maintainable, testable, and scalable as your application grows while adhering to Django, DRF, and Python best practices.

