# Leebook

Leebook is an internal SKU management system used for managing product inventory and related operations.

The system is built with **Laravel** and provides tools to manage SKUs, roles, and administrative operations.

---

# Requirements

- PHP 8.x
- Composer
- Node.js + npm
- SqlLite(temporal)
- Laravel compatible environment

---

# Installation

Clone the repository

```bash
git clone https://github.com/lebook-enterprise/app_lebook.git
cd app_lebook
```

Install dependencies

```bash
composer install
npm install
```

---

# Environment Configuration

Copy the environment file

```bash
cp .env.example .env
```

Generate application key

```bash
php artisan key:generate
```

Configure database credentials in `.env`.

---

# Database Setup

Run migrations

```bash
php artisan migrate
```

---

# Admin Setup

Currently the admin role must be inserted manually.

Example:

```php artisan tinker
DB::table('roles')->insert(['name' => 'admin']);
```

Then assign the role to a user.

```php artisan tinker
DB::table('users')
    ->where('id', 2)
    ->update(['role_id' => 2]);
```
---

# Running the Application

Start the dev environment

```bash
composer run dev
```

---

# Testing

Run tests with:

```bash
php artisan test
```

or

```bash
./vendor/bin/pest
```

---

# Development Notes

- Remember to run migrations after pulling new changes.
- Ensure roles exist in the database.
- Admin permissions are required for management operations.

---

# Contributing

1. Create a branch
2. Commit your changes
3. Open a Pull Request

---

# License

Internal company project.
