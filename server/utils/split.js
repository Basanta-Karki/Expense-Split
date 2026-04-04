export const calculateEqualSplit = (amount, participants, paidBy) => {
  const share = amount / participants.length;

  return participants.map((userId) => ({
    user: userId,
    amount: userId.toString() === paidBy.toString() ? 0 : share,
  }));
};
