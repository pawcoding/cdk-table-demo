import {
  heroBriefcaseMicro,
  heroClockMicro,
  heroEnvelopeMicro,
  heroGlobeAltMicro,
  heroHomeMicro,
  heroMapPinMicro,
  heroPhoneMicro,
  heroUserCircleMicro,
} from '@ng-icons/heroicons/micro';
import { Column } from '../types/column';
import { Person } from '../types/person';

export const COLUMNS: Array<Column<Person>> = [
  {
    key: 'firstName',
    label: 'First Name',
    icon: heroUserCircleMicro,
    sortable: true,
  },
  {
    key: 'lastName',
    label: 'Last Name',
    icon: heroUserCircleMicro,
    sortable: true,
  },
  {
    key: 'jobTitle',
    label: 'Job Title',
    icon: heroBriefcaseMicro,
    sortable: true,
  },
  {
    key: 'website',
    label: 'Website',
    icon: heroGlobeAltMicro,
    sortable: true,
  },
  {
    key: 'email',
    label: 'Email',
    icon: heroEnvelopeMicro,
    sortable: true,
  },
  {
    key: 'phone',
    label: 'Phone',
    icon: heroPhoneMicro,
    sortable: true,
  },
  {
    key: 'company',
    label: 'Company',
    icon: heroHomeMicro,
    sortable: true,
  },
  {
    key: 'street',
    label: 'Street',
    icon: heroMapPinMicro,
    sortable: true,
  },
  {
    key: 'city',
    label: 'City',
    icon: heroMapPinMicro,
    sortable: true,
  },
  {
    key: 'zip',
    label: 'ZIP Code',
    icon: heroMapPinMicro,
    sortable: true,
  },
  {
    key: 'country',
    label: 'Country',
    icon: heroMapPinMicro,
    sortable: true,
  },
  {
    key: 'createdAt',
    label: 'Created At',
    icon: heroClockMicro,
    sortable: true,
  },
  {
    key: 'updatedAt',
    label: 'Updated At',
    icon: heroClockMicro,
    sortable: true,
  },
  {
    key: 'avatarUrl',
    label: 'Avatar',
    icon: heroUserCircleMicro,
    sortable: false,
  },
];
