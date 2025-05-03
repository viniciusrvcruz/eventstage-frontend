import { Bookmark, LayoutList } from 'lucide-react'

export const eventFilters = [
  {
    value: 'myEvents',
    label: 'my_events',
    icon: <LayoutList />,
  },
  {
    value: 'mySubscriptions',
    label: 'my_subscriptions',
    icon: <Bookmark />,
  },
] as const

export type EventFilterValue = (typeof eventFilters)[number]['value']
