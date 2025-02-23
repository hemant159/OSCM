import React from 'react'
import { Helmet } from "react-helmet-async";

const Title = ({
    title = "OSCM",
    description = "this is a chat App"
}) => {
  return <Helmet>
    <title>{title}</title>
    <meta name="'description" content={description}></meta>
  </Helmet>
}

export default Title