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

import { mount } from 'enzyme';
import Textfield from '@react/react-spectrum/Textfield';
import ConstantValue, { formConfig } from '../constant';
import createExtensionBridge from '../../__tests__/helpers/createExtensionBridge';
import bootstrap from '../../bootstrap';

const getReactComponents = (wrapper) => {
  wrapper.update();
  const valueTextfield = wrapper.find(Textfield);

  return {
    valueTextfield
  };
};

describe('constant data element view', () => {
  let extensionBridge;
  let instance;

  beforeAll(() => {
    extensionBridge = createExtensionBridge();
    instance = mount(bootstrap(ConstantValue, formConfig, extensionBridge));
  });

  it('sets form values from settings', () => {
    extensionBridge.init({
      settings: {
        value: 'foo'
      }
    });

    const { valueTextfield } = getReactComponents(instance);

    expect(valueTextfield.props().value).toBe('foo');
  });

  it('sets settings from form values', () => {
    extensionBridge.init();

    const { valueTextfield } = getReactComponents(instance);
    valueTextfield.props().onChange('foo');

    expect(extensionBridge.getSettings()).toEqual({
      value: 'foo'
    });
  });

  it('sets errors if required values are not provided', () => {
    extensionBridge.init();
    expect(extensionBridge.validate()).toBe(false);

    const { valueTextfield } = getReactComponents(instance);

    expect(valueTextfield.props().validationState).toBe('invalid');
  });
});
