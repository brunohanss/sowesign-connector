# SoWeSign Connector

This package allows connection with the sowesign api. This is not an official package from sowesign.

# Usage

## Init

```
import { SoWeSign } from  "sowesign-connector/lib";
export const soWeSign = await new SoWeSign().initialize(<TOKEN>, <BASE-URL>)
```

## Students

Get all()

```
await soWeSign.students.getAll(include?:
      | 'reference'
      | 'gender'
      | 'lastName'
      | 'firstName'
      | 'birthDate'
      | 'email'
      | 'mobilePhone'
      | 'phone'
      | 'adress'
      | 'opcaNumber'
      | 'regionNumber'
      | 'unemployedNumber'
      | 'fileNumber'
      | 'photo'
      | 'employer'
      | 'start'
      | 'end'
      | 'data'
      | 'thirds'
      | 'financers'[])
```

Update or create

```
await soWeSign.students.updateOrCreate(student)
```

Delete

```
await soWeSign.students.delete(reference)
```

Counters

```
await soWeSign.students.counter(from: Date | string, to: Date | string, reference: string)
```

## Thirds

Get all

```
await soWeSign.thirds.getAll(include?:
    | 'reference'
    | 'gender'
    | 'lastName'
    | 'firstName'
    | 'birthDate'
    | 'email'
    | 'mobilePhone'
    | 'phone'
    | 'adress'
    | 'opcaNumber'
    | 'regionNumber'
    | 'unemployedNumber'
    | 'fileNumber'
    | 'photo'
    | 'employer'
    | 'start'
    | 'end'
    | 'data'
    | 'thirds'
    | 'financers'[])
```

Delete

```
await soWeSign.thirds.delete(reference)
```

## Trainers

Get all

```
await soWeSign.trainers.getAll(include?:
    | 'reference'
    | 'gender'
    | 'lastName'
    | 'firstName'
    | 'birthDate'
    | 'email'
    | 'mobilePhone'
    | 'phone'
    | 'adress'
    | 'opcaNumber'
    | 'regionNumber'
    | 'unemployedNumber'
    | 'fileNumber'
    | 'photo'
    | 'employer'
    | 'start'
    | 'end'
    | 'data'
    | 'thirds'
    | 'financers'[])
```

Delete

```
await soWeSign.trainers.delete(reference)
```
