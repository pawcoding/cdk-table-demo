import {
  featherBriefcase,
  featherClock,
  featherGlobe,
  featherHome,
  featherMail,
  featherMapPin,
  featherPhone,
  featherUser,
} from '@ng-icons/feather-icons';
import { Column } from '../types/column';
import { Person } from '../types/person';

export const COLUMNS: Array<Column<Person>> = [
  {
    key: 'firstName',
    label: 'First Name',
    icon: featherUser,
  },
  {
    key: 'lastName',
    label: 'Last Name',
    icon: featherUser,
  },
  {
    key: 'jobTitle',
    label: 'Job Title',
    icon: featherBriefcase,
  },
  {
    key: 'website',
    label: 'Website',
    icon: featherGlobe,
  },
  {
    key: 'email',
    label: 'Email',
    icon: featherMail,
  },
  {
    key: 'phone',
    label: 'Phone',
    icon: featherPhone,
  },
  {
    key: 'company',
    label: 'Company',
    icon: featherHome,
  },
  {
    key: 'street',
    label: 'Street',
    icon: featherMapPin,
  },
  {
    key: 'city',
    label: 'City',
    icon: featherMapPin,
  },
  {
    key: 'zip',
    label: 'ZIP Code',
    icon: featherMapPin,
  },
  {
    key: 'country',
    label: 'Country',
    icon: featherMapPin,
  },
  {
    key: 'createdAt',
    label: 'Created At',
    icon: featherClock,
  },
  {
    key: 'updatedAt',
    label: 'Updated At',
    icon: featherClock,
  },
  {
    key: 'avatarUrl',
    label: 'Avatar',
    icon: featherUser,
  },
];
