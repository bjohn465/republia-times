// @flow
export default function getMessage ({
  governmentName
  }: {
  governmentName: GovernmentName
}): string[] {
  const targetLoyalty = 20

  return [
    `Welcome to The ${governmentName} Times. You are the new editor-in-chief.`,
    `The war with Antegria is over` +
      ` and the rebellion uprising has been crushed.` +
      ` Order is slowly returning to ${governmentName}.`,
    `The public is not loyal to the government.`,
    `It is your job to increase their loyalty` +
      ` by editing The ${governmentName} Times carefully.` +
      ` Pick only stories that highlight the good things` +
      ` about ${governmentName} and its government.`,
    `You have 3 days to raise the public's loyalty to ${targetLoyalty}.`,
    `As a precaution against influence,` +
      ` we are keeping your wife and child in a safe location.`
  ]
}
