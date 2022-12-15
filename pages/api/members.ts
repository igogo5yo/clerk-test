import { faker } from "@faker-js/faker";
import memoizeOne from "memoize-one";
import { inboxes } from "../../constants";
import { IMember, TRole } from "../../types";

function _getMembers(): IMember[] {
  return new Array(1000).fill(null).map(() => ({
    fullName: faker.name.fullName(),
    email: faker.internet.email().toLowerCase(),
    avatar: faker.image.avatar(),
    role: faker.helpers.arrayElement<TRole>(['admin', 'agent', 'manager', 'member']),
    isPending: faker.helpers.arrayElement<boolean>([true, false]),
    inboxes: faker.helpers.arrayElements<string>(inboxes.map(({ value }) => value), Math.floor(Math.random() * inboxes.length))
  }));
}

const getMembers = memoizeOne(_getMembers);

export default function handler(req: any, res: any) {
  res.status(200).json(getMembers());
}
