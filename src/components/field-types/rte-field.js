import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from "react-ckeditor-component";

import { getEnvVar } from 'utils/get-env-var';

export default class RteField extends React.PureComponent {
    static propTypes = {
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

    handleChange(e) {
        const { onChange } = this.props;

        onChange(e.editor.getData());
    }


    render() {
        const { value } = this.props;

        const ckConfig = {
            filebrowserUploadUrl: `${getEnvVar('apiBase')}/ck-upload?uploadFullPath=${getEnvVar('uploadFullPath')}&uploadPath=${getEnvVar('uploadPath')}`,
            allowedContent: true
        };

        return  <CKEditor
                    content={value}
                    config={ckConfig}
                    events={{
                        "change": (e) => this.handleChange(e)
                    }}
                />;
    }
}