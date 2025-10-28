import React, { memo } from 'react';

import clsx from 'clsx';

import Badge, { badgeClasses } from '../Badge';

type Props = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  badgeText?: React.ReactNode;
  badgeVariant?: keyof typeof badgeClasses;
  status?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  classes?: {
    root?: string;
    title?: string;
    description?: string;
    badge?: string;
    status?: string;
    children?: string;
    footer?: string;
  };
  className?: string;
  footer?: React.ReactNode;
};

function Card({
  title,
  description,
  badgeText,
  badgeVariant = 'secondary',
  status,
  action,
  children,
  footer,
  classes,
  className,
}: Props) {
  const hasHeader =
    !!title || !!badgeText || !!status || !!description || !!action;

  return (
    <div
      className={clsx(
        'bg-card text-card-foreground rounded-xl border p-6',
        className,
        classes?.root,
      )}
      data-slot="card"
    >
      {hasHeader && (
        <div
          className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
          data-slot="card-header"
        >
          {(!!badgeText || !!status) && (
            <div>
              <Badge
                className={clsx(classes?.badge, 'mb-2 text-xs float-left')}
                variant={badgeVariant}
              >
                {badgeText}
              </Badge>
              <Badge
                className={clsx([classes?.status, 'text-xs float-right'])}
                variant="plain"
              >
                {status}
              </Badge>
            </div>
          )}
          {(!!title || !!action) && (
            <div className="flex gap-4 items-center mb-2">
              <h3
                className={clsx(['flex-1 leading-none', classes?.title])}
                data-slot="card-title"
              >
                {title}
              </h3>
              <div>{action}</div>
            </div>
          )}
          {!!description && (
            <div
              className={clsx(classes?.description, 'text-muted-foreground')}
              data-slot="card-description"
            >
              {description}
            </div>
          )}
        </div>
      )}

      <div
        className={clsx(['[&:not(:last-child)]:pb-6', classes?.children])}
        data-slot="card-content"
      >
        {children}
      </div>

      {!!footer && (
        <div
          className={clsx(
            classes?.footer,
            'flex items-center [.border-t]:pt-6',
          )}
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
