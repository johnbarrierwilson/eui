/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../../common';
import {
  EuiPageHeaderContent,
  _EuiPageHeaderContentProps,
} from './page_header_content';
import {
  _EuiPageRestrictWidth,
  setPropsForRestrictedPageWidth,
} from '../_restrict_width';

const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiPageHeader--paddingSmall',
  m: 'euiPageHeader--paddingMedium',
  l: 'euiPageHeader--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

export interface EuiPageHeaderProps
  extends CommonProps,
    HTMLAttributes<HTMLElement>,
    _EuiPageHeaderContentProps,
    _EuiPageRestrictWidth {
  /**
   * Adjust the padding.
   * When using this setting it's best to be consistent throughout all similar usages
   */
  paddingSize?: typeof PADDING_SIZES[number];
  /**
   * Adds a bottom border to separate it from the content after
   */
  bottomBorder?: boolean;
}

export const EuiPageHeader: FunctionComponent<EuiPageHeaderProps> = ({
  className,
  restrictWidth = false,
  paddingSize = 'none',
  bottomBorder,
  style,

  // Page header content shared props:
  alignItems,
  responsive = true,
  children,

  // Page header content only props:
  pageTitle,
  pageTitleProps,
  iconType,
  iconProps,
  tabs,
  tabsProps,
  breadcrumbs,
  breadcrumbProps,
  description,
  rightSideItems,
  rightSideGroupProps,
  ...rest
}) => {
  const { widthClassName, newStyle } = setPropsForRestrictedPageWidth(
    restrictWidth,
    style
  );

  const classes = classNames(
    'euiPageHeader',
    paddingSizeToClassNameMap[paddingSize],
    {
      [`euiPageHeader--${widthClassName}`]: widthClassName,
      'euiPageHeader--bottomBorder': bottomBorder,
      'euiPageHeader--responsive': responsive === true,
      'euiPageHeader--responsiveReverse': responsive === 'reverse',
      'euiPageHeader--tabsAtBottom': pageTitle && tabs,
      'euiPageHeader--onlyTabs':
        tabs && !pageTitle && !rightSideItems && !description && !children,
    },
    `euiPageHeader--${alignItems ?? 'center'}`,
    className
  );

  if (!pageTitle && !tabs && !description && !rightSideItems) {
    return (
      <header className={classes} style={newStyle || style} {...rest}>
        {children}
      </header>
    );
  }

  return (
    <header className={classes} style={newStyle || style} {...rest}>
      <EuiPageHeaderContent
        alignItems={alignItems}
        responsive={responsive}
        pageTitle={pageTitle}
        pageTitleProps={pageTitleProps}
        iconType={iconType}
        iconProps={iconProps}
        tabs={tabs}
        tabsProps={tabsProps}
        description={description}
        rightSideItems={rightSideItems}
        rightSideGroupProps={rightSideGroupProps}
        breadcrumbs={breadcrumbs}
        breadcrumbProps={breadcrumbProps}
      >
        {children}
      </EuiPageHeaderContent>
    </header>
  );
};
