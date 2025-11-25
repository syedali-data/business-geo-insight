import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppShell from '@/components/layout/AppShell';

export default function Settings() {
  return (
    <>
      <Helmet>
        <title>Settings - LocalPulse</title>
      </Helmet>

      <AppShell>
        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="font-heading text-3xl font-bold mb-2">Settings</h1>
              <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="referrals">Referrals</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <Card className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Organization Profile</h3>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="org-name">Organization Name</Label>
                        <Input id="org-name" placeholder="Acme Inc." />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Contact Email</Label>
                        <Input id="email" type="email" placeholder="contact@acme.com" />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="public-reports">Enable public report links</Label>
                          <p className="text-sm text-muted-foreground">Allow sharing reports via public URLs</p>
                        </div>
                        <Switch id="public-reports" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications">Email notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive updates when reports complete</p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button>Save Changes</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="team" className="space-y-4">
                <Card className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Team Members</h3>
                    <p className="text-sm text-muted-foreground mb-4">Invite team members to collaborate</p>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="email@example.com" />
                    <Button>Invite</Button>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground">No team members yet</p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="referrals" className="space-y-4">
                <Card className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Referral Program</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Earn 20 credits for each friend who runs their first report
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Your Referral Link</Label>
                    <div className="flex gap-2">
                      <Input readOnly value={`${location.origin}/?ref=YOURCODE`} />
                      <Button variant="outline">Copy</Button>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">0</div>
                        <div className="text-sm text-muted-foreground">Referrals</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">0</div>
                        <div className="text-sm text-muted-foreground">Credits Earned</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </AppShell>
    </>
  );
}
