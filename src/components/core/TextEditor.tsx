import dynamic from 'next/dynamic';
import React, { FC } from 'react';
// eslint-disable-next-line import/extensions

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
type TextEditorProps = {
  setValue: Function;
  value?: any;
  error: any;
  readOnly?: any;
};
const TextEditor: FC<TextEditorProps> = ({ setValue, value, error, readOnly }) => {
  return (
    <>
      <div>
        <SunEditor
          // readOnly={}
          height="150"
          defaultValue={value}
          disable={readOnly}
          // disableToolbar={true}
          onChange={(e) => setValue(e)}
          setOptions={{
            buttonList: [
              [
                // 'undo',
                // 'redo',
                'font',
                'fontSize',
                'formatBlock',
                'paragraphStyle',
                // 'blockquote',
                'bold',
                'underline',
                // 'italic',
                'strike',
                // 'subscript',
                // 'superscript',
                // 'fontColor',
                // 'hiliteColor',
                'textStyle',
                'removeFormat',
                // 'outdent',
                'indent',
                'align',
                // 'horizontalRule',
                'list',
                'lineHeight',
                // 'table',
                'link',
                'image',
                'video',
                // 'audio',
                // "math",
                // "imageGallery",
                'fullScreen',
                // 'showBlocks',
                'codeView',
                // 'preview',
                // 'print',
                // 'save',
                // 'template',
              ],
            ],
          }}
        />
      </div>
      {error && (
        <p className="text-red-600 text-[14px] mt-12" role="alert">
          {error}
        </p>
      )}
    </>
  );
};

export default TextEditor;
