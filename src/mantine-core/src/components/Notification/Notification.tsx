import React, { forwardRef } from 'react';
import { DefaultProps, MantineColor, ClassNames, useExtractedMargins } from '@mantine/styles';
import { Text } from '../Text/Text';
import { Loader } from '../Loader/Loader';
import { CloseButton } from '../ActionIcon/CloseButton/CloseButton';
import useStyles from './Notification.styles';

export type NotificationStylesNames = Exclude<ClassNames<typeof useStyles>, 'withIcon'>;

export interface NotificationProps
  extends DefaultProps<NotificationStylesNames>,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  /** Called when close button is clicked */
  onClose(): void;

  /** Notification line or icon color */
  color?: MantineColor;

  /** Notification icon, replaces color line */
  icon?: React.ReactNode;

  /** Notification title, displayed before body */
  title?: React.ReactNode;

  /** Notification body, place main text here */
  children?: React.ReactNode;

  /** Replaces colored line or icon with Loader component */
  loading?: boolean;

  /** Removes close button */
  disallowClose?: boolean;

  /** Props spread to close button */
  closeButtonProps?: React.ComponentPropsWithoutRef<'button'> & { [key: string]: any };
}

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      className,
      style,
      color = 'blue',
      loading = false,
      disallowClose = false,
      title,
      icon,
      children,
      onClose,
      closeButtonProps,
      classNames,
      styles,
      sx,
      ...others
    }: NotificationProps,
    ref
  ) => {
    const { classes, cx } = useStyles(
      { color, disallowClose },
      { sx, classNames, styles, name: 'Notification' }
    );
    const { mergedStyles, rest } = useExtractedMargins({ others, style });
    const withIcon = icon || loading;

    return (
      <div
        className={cx(classes.root, { [classes.withIcon]: withIcon }, className)}
        role="alert"
        style={mergedStyles}
        ref={ref}
        {...rest}
      >
        {icon && !loading && <div className={classes.icon}>{icon}</div>}

        {loading && <Loader size={28} color={color} className={classes.loader} />}

        <div className={classes.body}>
          {title && (
            <Text className={classes.title} size="sm" weight={500}>
              {title}
            </Text>
          )}

          <Text color="dimmed" className={classes.description} size="sm">
            {children}
          </Text>
        </div>

        {!disallowClose && (
          <CloseButton
            {...closeButtonProps}
            iconSize={16}
            color="gray"
            onClick={onClose}
            variant="hover"
            className={classes.closeButton}
          />
        )}
      </div>
    );
  }
);

Notification.displayName = '@mantine/core/Notification';
