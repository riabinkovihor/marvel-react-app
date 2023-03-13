import './searchForm.scss';
import {Link} from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import { useState } from "react";
import {Formik,Form, Field, ErrorMessage} from "formik";
import MyErrorMessage from "../errorMessage/ErrorMessage";

const validate = values => {
    const errors = {}
    const requiredFields = ['search']

    const minLengthFields = [
        {
            field: 'search',
            minLength: 2,
            error: 'Minimum length 2!'
        }
    ]

    minLengthFields.forEach(({field,minLength,error}) => {
        if (values[field].length < minLength ) errors[field] = error
    })
    requiredFields.forEach(field => {
        if(!values[field])  errors[field] = 'This field is required!'
    })

    return errors
}

const SearchForm = () => {
    const [ char,setChar ] = useState(null)
    const [ init,setInit ] = useState(false)
    const { error, loading, searchCharacter } = useMarvelService()

    const defaultError = 'The character was not found. Check the name and try again'

    const searchChar = async ({search}) => {
        setInit(true)
        setChar(null)

        const result = await searchCharacter(search)
        if (result) setChar(result)
    }

    return (
        <Formik
            initialValues={{
                search:''
            }}
            onSubmit={ searchChar }
            validate={validate}
        >
            <Form className="search-form">
                <div className="search-form__body">
                    <label htmlFor="search" className="search-form__label">Or find a character by name:</label>
                    <div className="search-form__row">
                        <Field id="search" placeholder="Enter name" className="search-form__input" name="search" type="text"/>
                        <button
                            type="submit"
                            className={init && loading ? 'button button__main button__loading' : 'button button__main'}>
                            <div className="inner">
                                FIND
                            </div>
                        </button>
                    </div>

                    <ErrorMessage className="search-form__row search-form__error" name="search" component="div"/>

                    {
                        init && !loading && char
                            ?
                            <div className="search-form__row">
                                <div className="search-form__success">{`There is! Visit ${char.name} page?`}</div>
                                <Link to={`char/${char.id}`} className="button button__secondary">
                                    <div className="inner">TO PAGE</div>
                                </Link>
                            </div>
                            : null
                    }

                    {
                        init && !loading && !char
                            ?
                            <div className="search-form__row ">
                                {
                                    error
                                        ?
                                        <div className="search-form__error">
                                            <MyErrorMessage/>
                                            { error }
                                        </div>
                                        :
                                        <div className="search-form__error">
                                            { defaultError }
                                        </div>
                                }
                            </div> : null
                    }
                </div>
            </Form>
        </Formik>
    )
}

export default SearchForm
