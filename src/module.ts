import { Field, FieldType, PanelPlugin } from '@grafana/data';
import { ImageSizeModes } from './constants';
import { ImagePanel } from './image-panel';
import { PanelOptions } from './types';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<PanelOptions>(ImagePanel).setPanelOptions((builder) => {
  return builder
    .addFieldNamePicker({
      path: 'name',
      name: 'Field name for Image',
      description: 'Name of the field with encoded image. If not specified, first field will be taken.',
      settings: {
        filter: (f: Field) => f.type === FieldType.string,
        noFieldsMessage: 'No strings fields found',
      },
    })
    .addTextInput({
      path: 'url',
      name: 'URL',
      category: ['URL'],
    })
    .addTextInput({
      path: 'title',
      name: 'Title',
      category: ['URL'],
    })
    .addRadio({
      path: 'widthMode',
      name: 'Width',
      settings: {
        options: [
          { value: ImageSizeModes.AUTO, label: 'Panel', description: 'Based on panel size' },
          { value: ImageSizeModes.ORIGINAL, label: 'Original' },
          { value: ImageSizeModes.CUSTOM, label: 'Custom' },
        ],
      },
      category: ['Width'],
      defaultValue: ImageSizeModes.AUTO,
    })
    .addFieldNamePicker({
      path: 'widthName',
      name: 'Field name',
      description: 'Name of the field with image width in px.',
      settings: {
        filter: (f: Field) => f.type === FieldType.number,
        noFieldsMessage: 'No number fields found',
      },
      category: ['Width'],
      showIf: (options: PanelOptions) => options.widthMode === ImageSizeModes.CUSTOM,
    })
    .addNumberInput({
      path: 'width',
      name: 'Custom width (px)',
      defaultValue: 0,
      category: ['Width'],
      showIf: (options: PanelOptions) => options.widthMode === ImageSizeModes.CUSTOM,
    })
    .addRadio({
      path: 'heightMode',
      name: 'Height',
      settings: {
        options: [
          { value: ImageSizeModes.AUTO, label: 'Panel', description: 'Based on panel size' },
          { value: ImageSizeModes.ORIGINAL, label: 'Original' },
          { value: ImageSizeModes.CUSTOM, label: 'Custom' },
        ],
      },
      category: ['Height'],
      defaultValue: ImageSizeModes.AUTO,
    })
    .addFieldNamePicker({
      path: 'heightName',
      name: 'Field name',
      description: 'Name of the field with image height in px.',
      settings: {
        filter: (f: Field) => f.type === FieldType.number,
        noFieldsMessage: 'No number fields found',
      },
      category: ['Height'],
      showIf: (options: PanelOptions) => options.heightMode === ImageSizeModes.CUSTOM,
    })
    .addNumberInput({
      path: 'height',
      name: 'Custom height (px)',
      defaultValue: 0,
      category: ['Height'],
      showIf: (options: PanelOptions) => options.heightMode === ImageSizeModes.CUSTOM,
    });
});
