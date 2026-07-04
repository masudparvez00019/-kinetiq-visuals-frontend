import React from "react";
import ProductDetailsHero from "./_components/ProductDetailsHero";
import ProductSpecs from "./_components/ProductSpecs";
import ProductsPreview from "./_components/ProductsPreview";
import ProductsCta from "./_components/ProductsCta";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <>
      <ProductDetailsHero id={resolvedParams.id} />
      <ProductSpecs />
      <ProductsPreview />
      <ProductsCta />
    </>
  );
}
