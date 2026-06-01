import { gql } from "@apollo/client";

import { ASSET_FIELDS } from "@/contentful/graphql/fragments/asset";

export const PAGE_SEO_FIELDS = gql`
  fragment PageSeoFields on PageSeo {
    internalName
    metaTitle
    metaDescription
    canonicalUrl
    noIndex
    ogTitle
    ogDescription
    twitterCard
    ogImage {
      ...AssetFields
    }
  }
  ${ASSET_FIELDS}
`;
