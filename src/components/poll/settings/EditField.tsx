import React from 'react'
import { Mutation, MutationUpdaterFn } from "react-apollo";
import TextInputGroup from '../../layout/TextInputGroup';
import { IPollQuery } from '../../../interfaces';
import { Label, GridWrapper } from '../../../style/elements';
import styled from 'styled-components';
import Pencil from '../../../images/pencil.svg';

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
    handleEditClick: (e: React.MouseEvent<HTMLDivElement>) => void
    error?: string
    className?: string
}

const EditField = (props: Props) => {

    return <GridWrapper gridTemplateColumns="12.5% 87.5%" className={props.className}>
        <Label>{props.label}</Label>
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
            <div >
                <p>{props.value}</p>
                <ButtonWrapper data-testid={`edit-${props.name}-button`} id={props.name} onClick={props.handleEditClick}><img src={Pencil} alt="edit" /></ButtonWrapper>
            </div>
        }
    </GridWrapper>
}

const ButtonWrapper = styled.div`
display: inline-block;
margin-left: .4rem;
cursor: pointer;
`

export default styled(EditField)`
${Label}{
    display: inline-block;
}
form{
    display: inline-block;
}
p{
    display: inline-block;
}
`;