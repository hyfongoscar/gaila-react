import React, { memo } from 'react';

import clsx from 'clsx';

import Badge, { badgeClasses } from '../Badge';

type Props = {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  badgeText?: React.ReactNode;
  badgeVariant?: keyof typeof badgeClasses;
  status?: React.ReactNode;
  statusClass?: string;
  children: React.ReactNode;
  childrenClassName?: string;
  footer?: React.ReactNode;
};

function Card({
  className,
  title,
  description,
  badgeText,
  badgeVariant = 'secondary',
  status,
  statusClass,
  children,
  childrenClassName,
  footer,
}: Props) {
  const hasHeader = !!title || !!badgeText || !!status || !!description;

  return (
    <div
      className={clsx(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border',
        className,
      )}
      data-slot="card"
    >
      {hasHeader && (
        <div
          className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
          data-slot="card-header"
        >
          {(!!badgeText || !!status) && (
            <div className="flex items-start justify-between gap-2">
              <Badge className="mb-2 text-xs" variant={badgeVariant}>
                {badgeText}
              </Badge>
              <Badge className={clsx([statusClass, 'text-xs'])} variant="plain">
                {status}
              </Badge>
            </div>
          )}
          {!!title && (
            <h4 className="leading-none" data-slot="card-title">
              {title}
            </h4>
          )}
          {!!description && (
            <p className="text-muted-foreground" data-slot="card-description">
              {description}
            </p>
          )}
        </div>
      )}

      <div
        className={clsx(['px-6 [&:last-child]:pb-6', childrenClassName])}
        data-slot="card-content"
      >
        {children}
      </div>

      {!!footer && (
        <div
          className="flex items-center px-6 pb-6 [.border-t]:pt-6"
          data-slot="card-footer"
        >
          {footer}
        </div>
      )}
    </div>
  );
}

// function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
//   return (
//     <div
//       className={clsx(
//         'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
//         className,
//       )}
//       data-slot="card-action"
//       {...props}
//     />
//   );
// }

export default memo(Card);
