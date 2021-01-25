import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Perahu App',
    description: 'Pembinaan generasi Margahayu',
    keywords: 'generasi, penerus, generus, ppg, margahayu',
}

export default Meta
