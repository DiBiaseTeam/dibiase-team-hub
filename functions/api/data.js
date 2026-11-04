const DEFAULTS = {
  adminPassword: 'admin',
  agents: [],
  checklists: {
    new: [
      { id: 'n1', title: 'Attend new hire orientation', description: 'Complete the welcome session and company overview', day: 'Day 1' },
      { id: 'n2', title: 'Complete HR paperwork', description: 'Fill out and submit all required employment documents', day: 'Day 1' },
      { id: 'n3', title: 'Set up workstation & system access', description: 'Get your computer configured and request access to required systems', day: 'Day 1' },
      { id: 'n4', title: 'Meet with your team leader', description: 'Align on first-week goals, expectations, and your 30-60-90 day plan', day: 'Day 1' },
      { id: 'n5', title: 'Review company policies & handbook', description: 'Read through all policies, procedures, and code of conduct', day: 'Day 1–2' },
      { id: 'n6', title: 'Join team communication channels', description: 'Set up your accounts and introduce yourself to the team', day: 'Day 2' },
      { id: 'n7', title: 'Complete product knowledge training', description: 'Finish all required product and service knowledge courses', day: 'Week 1' },
      { id: 'n8', title: 'Shadow 5+ agent calls', description: 'Listen in on calls with experienced agents to learn the process', day: 'Week 1' },
      { id: 'n9', title: 'Complete compliance & privacy training', description: 'Finish all required compliance, privacy, and security training modules', day: 'Week 1' },
      { id: 'n10', title: 'Handle first supervised call', description: 'Take your first live call with a supervisor or mentor present', day: 'Week 2' },
    ],
    experienced: [
      { id: 'e1', title: 'Complete returning agent paperwork', description: 'Submit any required re-hire documentation', day: 'Day 1' },
      { id: 'e2', title: 'Update system access & credentials', description: 'Reset passwords and verify access to all required systems', day: 'Day 1' },
      { id: 'e3', title: 'Review policy & procedure updates', description: 'Read through any changes since your last tenure', day: 'Day 1' },
      { id: 'e4', title: 'Meet with team lead', description: 'Reconnect, review team goals, and get current on priorities', day: 'Day 1' },
      { id: 'e5', title: 'Complete product/service refresher', description: 'Get up to speed on any new or updated offerings', day: 'Week 1' },
      { id: 'e6', title: 'Complete compliance refresher', description: 'Complete the required compliance and privacy refresher modules', day: 'Week 1' },
      { id: 'e7', title: 'Mentor and support new team members', description: 'Introduce yourself and offer guidance to new agents on the team', day: 'Week 1' },
    ]
  }
};

export async function onRequestGet({ env }) {
  const raw = await env.ONBOARDING_KV.get('data');
  if (!raw) {
    await env.ONBOARDING_KV.put('data', JSON.stringify(DEFAULTS));
    return Response.json(DEFAULTS);
  }
  return Response.json(JSON.parse(raw));
}

export async function onRequestPut({ request, env }) {
  const data = await request.json();
  await env.ONBOARDING_KV.put('data', JSON.stringify(data));
  return Response.json({ ok: true });
}
