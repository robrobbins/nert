import IMember from '../interfaces/member'

export default class Member implements IMember {
  constructor(
    public readonly firstName_: string,
    public readonly lastName_: string,
    public title_: string = '',
    public foo_: number = 0) {}

  get title() { return this.title_ }
  set title(title: string) { this.title_ = title }
  get foo() { return this.foo_ }
  set foo(foo: number) { this.foo_ = foo }

  // TODO determine of concat'ing strings in a contract is something you would ever do...
  // returning both in an array for now
  getFullName(): string[] { return [this.firstName_, this.lastName_] }
}
