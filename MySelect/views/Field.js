/** @jsx jsx */

import {jsx} from '@emotion/core';
import {Component} from 'react';
import {FieldContainer, FieldLabel, FieldDescription, FieldInput} from '@arch-ui/fields';
import Select from '@arch-ui/select';

import dataFetch from "../dataFetch"


class SelectField extends Component {
    onChange = option => {
        this.props.onChange(option ? option.value : null);
    };

    state = {
        options: []
    }

    async componentDidMount() {
        const data = await dataFetch()
        // valid value
        data.push({label: "pending todo", value: "pending"})
        this.setState({options:data})
    }

    render() {
        const {autoFocus, field, value: serverValue, renderContext, errors} = this.props;
        const value = field.options.find(i => i.value === serverValue);
        const htmlID = `ks-input-${field.path}`;
        const canRead = errors.every(
            error => !(error instanceof Error && error.name === 'AccessDeniedError')
        );
        const error = errors.find(
            error => error instanceof Error && error.name === 'AccessDeniedError'
        );
        console.log('state.options',this.state.options)
        console.log('props.options',this.props.field.options)

        const selectProps =
            renderContext === 'dialog'
                ? {
                    menuPortalTarget: document.body,
                    menuShouldBlockScroll: true,
                }
                : null;
        return (
            <FieldContainer>
                <FieldLabel htmlFor={htmlID} field={field} errors={errors}/>
                {field.config.adminDoc && <FieldDescription>{field.config.adminDoc}</FieldDescription>}
                <FieldInput>
                    <div css={{flex: 1}}>
                        <Select
                            autoFocus={autoFocus}
                            value={canRead ? value : undefined}
                            placeholder={canRead ? undefined : error.message}
                            options={this.state.options}
                            onChange={this.onChange}
                            isClearable
                            id={`react-select-${htmlID}`}
                            inputId={htmlID}
                            instanceId={htmlID}
                            {...selectProps}
                        />
                    </div>
                </FieldInput>
            </FieldContainer>

        );
    }
}

export default SelectField