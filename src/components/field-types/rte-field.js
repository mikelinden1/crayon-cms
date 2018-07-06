import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from "react-ckeditor-component";

import config from 'config';

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
            filebrowserUploadUrl: `${config.apiBase}/ck-upload?uploadFullPath=${config.uploadFullPath}&uploadPath=${config.uploadPath}`,
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