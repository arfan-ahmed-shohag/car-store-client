import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../components/ui/collapsible";

interface Props {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function CatalogFilterGroup({ title, defaultOpen = false, children }: Props) {
  return (
    <Collapsible className="catalog-filter" defaultOpen={defaultOpen}>
      <h3 className="catalog-filter__heading">
        <CollapsibleTrigger className="catalog-filter__trigger">{title}<ChevronDown aria-hidden="true" /></CollapsibleTrigger>
      </h3>
      <CollapsibleContent className="catalog-filter__content">
        <div className="catalog-filter__content-inner">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
