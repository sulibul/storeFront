from django.contrib.auth.base_user import BaseUserManager
# from django.utils.translation import ugettext_lazy as _


class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password, is_superuser, is_staff, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            password=password,
            is_active=True,
            is_superuser=is_superuser,
            is_staff=is_staff,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, **extra_fields):
        user = self._create_user(
            email, password, False, False, **extra_fields)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self._create_user(
            email, password, True, True, **extra_fields)
        user.save(using=self._db)

        return user


# class CustomUserManager(BaseUserManager):

#     def _create_user(self, email, password, is_staff, is_admin, name,
#                      surname,
#                      date_of_birth, city, post_code, street):

#         required_fields = [
#             (not email, ('Users must have an email address')),
#             (not name, "User must have a first name"),
#             (not surname, "User must have a last name"),
#             (not date_of_birth, "User must have a date of birth"),
#             (not city, "User must have a city"),
#             (not post_code, "User must have a post code"),
#             (not street, "User must have a street")
#         ]

#         for condition, error_message in required_fields:
#             if condition:
#                 raise ValueError(error_message)
#         email = self.normalize_email(email)
#         user = self.model(email=email, name=name,
#                      surname=surname,
#                      date_of_birth=date_of_birth, city=city, post_code=post_code, street=street,
#                      is_staff=is_staff, is_admin=is_admin)
#         user.set_password(password)
#         user.save()
#         return user
#     def create_user():
#     def create_superuser(self, email, password, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         extra_fields.setdefault('is_active', True)
#         extra_fields.setdefault()
#         if extra_fields.get('is_staff') is not True:
#             raise ValueError(_('Superuser must have is_staff=True.'))
#         if extra_fields.get('is_superuser') is not True:
#             raise ValueError(_('Superuser must have is_superuser=True.'))
#         return self.create_user(email, password, **extra_fields)
