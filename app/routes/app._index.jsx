import { Page, DataTable, Card } from '@shopify/polaris';
import shopify from '../shopify.server';
import { useLoaderData } from '@remix-run/react';

export const loader = async ({ request }) => {
  const { admin, session } = await shopify.authenticate.admin(request);
  const data = await admin.rest.resources.Customer.all({ session, limit: 200 });
  return data.data;
};

export default function Index() {
  const data = useLoaderData();
  console.log(data);
  const rows = data.map((customer) => [
    customer.id,
    customer.email,
    customer.email_marketing_consent.state,
    customer.currency,
    customer.orders_count,
    customer.total_spent,
    customer.state,
  ]);

  return (
    <Page title="Customer List">
      <Card>
        <DataTable
          columnContentTypes={[
            'text',
            'text',
            'text',
            'text',
            'numeric',
            'numeric',
            'text',
          ]}
          headings={[
            'Customer ID',
            'Email',
            'Email Marketing State',
            'Currency',
            'Orders Count',
            'Total Spent',
            'State',
          ]}
          rows={rows}
        />
      </Card>
    </Page>
  );
}