/***************************************************************************************
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 ****************************************************************************************/

import React from 'react';
import Textfield from '@react/react-spectrum/Textfield';
import WrappedField from '../../components/wrappedField';
import SelectorLearnMoreLink from '../../components/selectorLearnMoreLink';

export default () => (
  <div className="u-alignItemsCenter u-flex">
    <span className="u-gapRight">Elements matching the CSS selector</span>
    <label className="u-flexOne">
      <WrappedField
        className="u-fullWidth"
        name="elementSelector"
        component={Textfield}
        componentClassName="u-fullWidth u-minFieldWidth"
      />
    </label>
    <SelectorLearnMoreLink />
  </div>
);

export const formConfig = {
  settingsToFormValues(values, settings) {
    return {
      ...values,
      ...settings
    };
  },
  formValuesToSettings(settings, values) {
    return {
      ...settings,
      elementSelector: values.elementSelector
    };
  },
  validate: (errors, values) => {
    errors = {
      ...errors
    };

    if (!values.elementSelector) {
      errors.elementSelector = 'Please specify a CSS selector.';
    }

    return errors;
  }
};
