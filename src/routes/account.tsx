import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient, authEnabled } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  component: AccountPage,
});

function AccountPage() {
  const { user, isPending } = useCurrentUserState();

  if (isPending) {
    return (
      <main className="grid min-h-screen place-items-center">
        <p>Loading account…</p>
      </main>
    );
  }

  if (!user || !authEnabled) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold">Your Account</h1>
        <p className="text-muted">Manage your profile, security, and privacy settings.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="danger">Danger</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSection user={user} />
        </TabsContent>
        <TabsContent value="security">
          <SecuritySection />
        </TabsContent>
        <TabsContent value="sessions">
          <SessionsSection />
        </TabsContent>
        <TabsContent value="privacy">
          <PrivacySection />
        </TabsContent>
        <TabsContent value="danger">
          <DangerSection />
        </TabsContent>
      </Tabs>
    </main>
  );
}

function ProfileSection({ user }: { user: any }) {
  const [name, setName] = useState(user.name || user.displayName || "");
  const [loading, setLoading] = useState(false);

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await authClient.updateUser({ name });
      if (error) throw new Error(error.message);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Profile Information</h2>
      <form onSubmit={updateProfile} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Display Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={user.email || user.primaryEmail || ""} disabled />
          <p className="text-xs text-muted">Email cannot be changed here.</p>
        </div>
        {user.image && (
          <div>
            <img src={user.image} alt="Avatar" className="h-16 w-16 rounded-full" />
          </div>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : "Save changes"}
        </Button>
      </form>
    </Card>
  );
}

function SecuritySection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
      });
      if (error) throw new Error(error.message);
      toast.success("Password changed");
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Change Password</h2>
      <form onSubmit={changePassword} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current">Current Password</Label>
          <Input id="current" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new">New Password</Label>
          <Input id="new" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={8} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm New Password</Label>
          <Input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Updating…" : "Update password"}
        </Button>
      </form>
      <div className="pt-4 border-t">
        <h3 className="font-medium">Connected Accounts</h3>
        <p className="text-sm text-muted">Google and X are linked via the auth broker.</p>
        <Button variant="outline" className="mt-2" asChild>
          <Link to="/login">Manage connections</Link>
        </Button>
      </div>
    </Card>
  );
}

function SessionsSection() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadSessions() {
    setLoading(true);
    try {
      const { data, error } = await authClient.listSessions();
      if (error) throw new Error(error.message);
      setSessions(data || []);
    } catch (err) {
      toast.error("Could not load sessions");
    } finally {
      setLoading(false);
    }
  }

  // Load on mount conceptually - for simplicity call on button
  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Active Sessions</h2>
        <Button onClick={loadSessions} disabled={loading} variant="outline">
          {loading ? "Loading…" : "Refresh sessions"}
        </Button>
      </div>
      {sessions.length === 0 ? (
        <p className="text-muted">No sessions loaded. Click refresh.</p>
      ) : (
        <ul className="space-y-2">
          {sessions.map((s) => (
            <li key={s.id} className="flex justify-between border p-3 rounded">
              <span>{s.userAgent || "Unknown device"} - {new Date(s.createdAt).toLocaleString()}</span>
              <Button size="sm" variant="destructive" onClick={async () => {
                await authClient.revokeSession({ token: s.token });
                toast.success("Session revoked");
                loadSessions();
              }}>
                Revoke
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function PrivacySection() {
  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Privacy & Data</h2>
      <p>Your data stays private. PrivacyByAI prioritizes local processing where possible.</p>
      <div className="space-y-2">
        <Button variant="outline" onClick={() => toast.info("Data export requested — check your email (demo)")}>Export my data</Button>
        <Button variant="outline" onClick={() => toast.info("Download history cleared (demo)")}>Clear activity</Button>
      </div>
      <p className="text-xs text-muted">Full data controls are available in the privacy dashboard.</p>
    </Card>
  );
}

function DangerSection() {
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function deleteAccount() {
    if (confirm !== "DELETE") {
      toast.error("Type DELETE to confirm");
      return;
    }
    setLoading(true);
    try {
      const { error } = await authClient.deleteUser();
      if (error) throw new Error(error.message);
      toast.success("Account deleted");
      window.location.href = "/";
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6 space-y-4 border-destructive">
      <h2 className="text-xl font-semibold text-destructive">Danger Zone</h2>
      <p>Permanently delete your account and all associated data. This cannot be undone.</p>
      <div className="space-y-2">
        <Label>Type DELETE to confirm</Label>
        <Input value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="DELETE" />
      </div>
      <Button variant="destructive" onClick={deleteAccount} disabled={loading || confirm !== "DELETE"}>
        {loading ? "Deleting…" : "Delete my account"}
      </Button>
    </Card>
  );
}
