# SoWeSign Connector (

This package allows connection with the sowesign api. This is not an official package from sowesign.

# Usage

## Init

```
import { SoWeSign } from  "sowesign-connector/lib";
export const soWeSign = await this.connect.initialize(<TOKEN>, <BASE-URL>)
```

## Students

Get all

```
await soWeSign.students.getAll()
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
await soWeSign.students.counter(reference)
```

## Thirds

Get all

```
await soWeSign.thirds.getAll()
```

Delete

```
await soWeSign.thirds.delete(reference)
```

## Trainers

Get all

```
await soWeSign.trainers.getAll()
```

Delete

```
await soWeSign.trainers.delete(reference)
```
