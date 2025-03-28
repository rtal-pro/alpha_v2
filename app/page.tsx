// Maquette vitrine OPEXA adaptée au segment Airbnb
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ScanLine, Mail, Users } from "lucide-react";
import Link from "next/link";

export default function AirbnbLanding() {
  return (
    <div className="min-h-screen px-6 py-12">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">La tranquillité pour vos logements en Airbnb.</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Gérez vos interventions, vos prestataires et vos incidents terrain grâce aux QR codes intelligents d’OPEXA.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">
            <Link  href="/dashboard" >Créer mon compte gratuitement</Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link href="/dashboard">Découvrir la démo</Link>
          </Button>
        </div>
      </section>

      {/* Problème/Solution */}
      <section className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Sans OPEXA</h2>
            <ul className="text-muted-foreground list-disc ml-5 space-y-1">
              <li>Pas de preuve que le ménage a été fait</li>
              <li>Aucune traçabilité des incidents signalés</li>
              <li>Coordination des prestataires manuelle et chaotique</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Avec OPEXA</h2>
            <ul className="text-green-700 list-disc ml-5 space-y-1">
              <li>QR codes géolocalisés dans chaque logement</li>
              <li>Signalement simple par le locataire sans app</li>
              <li>Validation de tâches avec preuve par prestataire</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Fonctionnalités clés */}
      <section className="max-w-6xl mx-auto mb-24">
        <h2 className="text-2xl font-bold text-center mb-10">Fonctionnalités clés pour la location courte durée</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-5">
              <ScanLine className="h-8 w-8 mb-2" />
              <h3 className="font-semibold text-lg">Scan intelligent</h3>
              <p className="text-muted-foreground text-sm">Le locataire scanne et signale un problème en 30 secondes, sans compte ni app.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <CheckCircle className="h-8 w-8 mb-2" />
              <h3 className="font-semibold text-lg">Tâches horodatées</h3>
              <p className="text-muted-foreground text-sm">Le prestataire valide son passage et laisse un commentaire ou une photo.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <CheckCircle className="h-8 w-8 mb-2" />
              <h3 className="font-semibold text-lg">Historique consolidé</h3>
              <p className="text-muted-foreground text-sm">Tous les signalements et actions sont historisés par logement.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Témoignages */}
      <section className="max-w-5xl mx-auto mb-24 text-center">
        <h2 className="text-2xl font-bold mb-6">Ils utilisent déjà OPEXA</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <p className="italic mb-4">“Grâce à OPEXA, j’ai enfin une vraie visibilité sur les interventions terrain. Mes prestataires n’oublient plus rien.”</p>
              <p className="font-semibold">— Sarah, Gestionnaire Airbnb à Lyon</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="italic mb-4">“Le signalement par QR code m’a permis de réagir rapidement aux soucis. C’est simple, rapide, et mes locataires adorent.”</p>
              <p className="font-semibold">— Marc, Conciergerie Parisienne</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tarification */}
      <section className="max-w-4xl mx-auto mb-24 text-center">
        <h2 className="text-2xl font-bold mb-6">Tarifs simples et transparents</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Formule Essentielle</h3>
              <p className="mb-4 text-muted-foreground">Pour les indépendants ou petites conciergeries</p>
              <ul className="list-disc text-left ml-6 mb-4">
                <li>10 logements</li>
                <li>100 QR codes</li>
                <li>3 utilisateurs</li>
              </ul>
              <p className="text-lg font-bold">29€/mois</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Formule Pro</h3>
              <p className="mb-4 text-muted-foreground">Pour les gestionnaires avancés</p>
              <ul className="list-disc text-left ml-6 mb-4">
                <li>Jusqu’à 100 logements</li>
                <li>QR codes illimités</li>
                <li>10 utilisateurs</li>
              </ul>
              <p className="text-lg font-bold">89€/mois</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section Contact */}
      <section className="text-center mb-20">
        <h2 className="text-2xl font-semibold mb-2">Une question ? Un besoin spécifique ?</h2>
        <p className="text-muted-foreground mb-4">Écrivez-nous, nous répondons dans les 24h.</p>
        <Button variant="outline" size="lg" className="gap-2">
          <Mail className="h-4 w-4" />
          Contactez l’équipe OPEXA
        </Button>
      </section>

      {/* CTA Final */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Offrez un service haut de gamme à vos locataires.</h2>
        <p className="text-muted-foreground mb-6">OPEXA simplifie la gestion terrain pour les pros de la location saisonnière.</p>
        <Button size="lg">Créer mon compte gratuitement</Button>
      </section>
    </div>
  );
}