import React from 'react'
import { Mutation, MutationUpdaterFn } from "react-apollo";
import TextInputGroup from '../../layout/TextInputGroup';
import { IPollQuery } from '../../../interfaces';

interface Props {
    label: string
    open: boolean
    mutation: any
    poll: IPollQuery
    value: any
    setValue: (newValue: any) => void
    name: string
    placeholder: string
    update: MutationUpdaterFn<any>
    onSubmit: (e: any, mutation: any) => void
    cancel: () => void
    handleEditClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    error?: string
}

const EditField = (props: Props) => {

    return <div>
        <h4>{props.label}</h4>
        {props.open ?
            <Mutation
                mutation={props.mutation}
                update={props.update}
            >
                {(MUTATION, { loading, error }) => {
                    if (loading) return <div>Loading...</div>
                    if (error) return <div>Error :(</div>
                    return <form name={props.name} data-testid={`edit-${props.name}-form`} onSubmit={ // tslint:disable-next-line jsx-no-lambda
                        (e) => { props.onSubmit(e, MUTATION) }}>
                        <TextInputGroup
                            value={props.value}
                            onChange={// tslint:disable-next-line jsx-no-lambda
                                (e: React.ChangeEvent<any>) => { props.setValue(e.target.value) }}
                            name={props.name}
                            placeholder={props.placeholder}
                            error={props.error ? props.error : undefined}
                            testId={`${props.name}-input`} />
                        <button data-testid={`${props.name}-save-button`}>Save</button>
                        <button data-testid={`${props.name}-cancel-button`} type="button" onClick={props.cancel}>cancel</button>
                    </form>
                }}
            </Mutation> :
            <div>
                <p className="d-inline-block">{props.value}</p>
                <button data-testid={`edit-${props.name}-button`} name={props.name} onClick={props.handleEditClick}>Edit</button>
            </div>
        }
    </div>
}

export default EditField;