import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { Customer } from '@/types/customer';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, message, segmentId } = await request.json();

    // First, get the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create the campaign
    const campaign = await prisma.campaign.create({
      data: {
        name,
        message,
        status: 'DRAFT',
        userId: user.id,
        segmentId,
      },
      include: {
        segment: {
          select: {
            name: true,
          },
        },
      },
    });

    // Simulate sending messages to customers
    setTimeout(async () => {
      try {
        // Update campaign status to SENT
        await prisma.campaign.update({
          where: { id: campaign.id },
          data: { status: 'SENT' },
        });

        // Create communication logs
        const customers = await prisma.customer.findMany({
          where: {
            segmentId,
          },
        });

        const logs = customers.map((customer: Customer) => ({
          campaignId: campaign.id,
          customerId: customer.id,
          status: Math.random() < 0.9 ? 'SENT' : 'FAILED', // 90% success rate
          message: message.replace('{name}', customer.name),
        }));

        await prisma.communicationLog.createMany({
          data: logs,
        });
      } catch (error) {
        console.error('Error processing campaign:', error);
      }
    }, 2000); // Simulate 2-second delay

    return NextResponse.json(campaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json(
      { error: 'Error creating campaign' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const campaigns = await prisma.campaign.findMany({
      where: {
        userId: user.id,
      },
      include: {
        segment: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { error: 'Error fetching campaigns' },
      { status: 500 }
    );
  }
} 