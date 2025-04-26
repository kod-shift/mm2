import {
  reactExtension,
  Button,
  useSettings,
  useEmail,
  useApi
} from '@shopify/ui-extensions-react/checkout';
import { BlockStack, List, ListItem, Text, TextBlock } from '@shopify/ui-extensions/checkout';
import React from 'react';

const thankYouBlock = reactExtension("purchase.thank-you.block.render", () => <ExtensionThankuRender />);
export { thankYouBlock };

const orderDetailsBlock = reactExtension("customer-account.order-status.block.render", () => <ExtensionOrderRender />);
export { orderDetailsBlock };

function ExtensionThankuRender() {
  const data = useApi();
  const email = useEmail();
  let orderId = data.orderConfirmation.current.order.id;
  orderId = orderId.match(/(\d+)$/)[0];
  const { url: buttonurl } = useSettings();
  const baseUrl = buttonurl ?? 'https://claim.mm2.land/';
  const url = `${baseUrl}?order=${orderId}&email=${email}`;
  return (
    <>
      <BlockStack>
        <Text>You're one step closer to your MM2 items! Click the claim button below to begin.</Text>
        If you can't claim on this device or need to try again:
        <List>
          <ListItem>Use a different device & check your email</ListItem>
          <ListItem>Find your order confirmation email</ListItem>
          <ListItem>Click “View your order” and it will bring you back here</ListItem>
        </List>
        If you're on a mobile device, please make sure you're logged in to ROBLOX on both your browser (Safari, Chrome, etc) and the ROBLOX app before you claim!
      </BlockStack>
      <Button to={url} className='custom-button'>CLAIM ORDER</Button>
    </>
  );
}

function ExtensionOrderRender() {
  const email = useEmail();
  const data = useApi();
  let orderId = data.order.current.id;
  orderId = orderId.match(/(\d+)$/)[0];
  const { url: buttonurl } = useSettings();
  const baseUrl = buttonurl ?? 'https://claim.mm2.land/';
  const url = `${baseUrl}?order=${orderId}&email=${email}`;
  return (
    <>
      <BlockStack>
        <Text>You're one step closer to your MM2 items! Click the claim button below to begin.</Text>
        If you can't claim on this device or need to try again:
        <List>
          <ListItem>Use a different device & check your email</ListItem>
          <ListItem>Find your order confirmation email</ListItem>
          <ListItem>Click “View your order” and it will bring you back here</ListItem>
        </List>
        If you're on a mobile device, please make sure you're logged in to ROBLOX on both your browser (Safari, Chrome, etc) and the ROBLOX app before you claim!
      </BlockStack>
      <Button to={url} className='custom-button'>CLAIM ORDER</Button>
    </>
  );
}