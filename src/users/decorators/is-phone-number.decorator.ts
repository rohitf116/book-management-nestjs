import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsPhoneNumberConstraint } from '../validators/is-phone-number.constraint';

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsPhoneNumberConstraint,
    });
  };
}
