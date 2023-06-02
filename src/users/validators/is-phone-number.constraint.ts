import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPhoneNumber', async: false })
export class IsPhoneNumberConstraint implements ValidatorConstraintInterface {
  validate(phoneNumber: string, args: ValidationArguments) {
    return /^[6-9]\d{9}$/.test(phoneNumber);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Phone number must start with a digit between 6 and 9 and be exactly 10 digits long';
  }
}
